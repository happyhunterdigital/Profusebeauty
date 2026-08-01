import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as crypto from "crypto";

admin.initializeApp();

// AI Beauty Assistant — see chatEndpoint.ts / knowledge.ts / deepseekService.ts
export { beautyChat } from "./chatEndpoint";

const PAYFAST_LIVE_URL = "https://www.payfast.co.za/eng/process";
const PAYFAST_SANDBOX_URL = "https://sandbox.payfast.co.za/eng/process";

const PAYFAST_VALID_IPS = [
  "197.97.145.144",
  "41.74.179.194",
  "41.74.179.195",
  "41.74.179.198",
  "41.74.179.199",
  "41.74.179.200",
  "41.74.179.201",
  "41.74.179.202",
  "41.74.179.203",
  "41.74.179.204",
  "41.74.179.209",
  "41.74.179.210",
  "41.74.179.211",
  "41.74.179.212",
  "41.74.179.213",
  "41.74.179.214",
  "102.216.42.68",
  "196.6.247.130",
];

function validatePayfastSignature(pfData: Record<string, string>, passphrase: string): boolean {
  const receivedSignature = pfData.signature;
  if (!receivedSignature) return false;

  const keys = Object.keys(pfData).filter((k) => k !== "signature").sort();
  let paramString = "";
  for (const key of keys) {
    const val = pfData[key];
    if (val !== "" && val !== undefined && val !== null) {
      paramString += `${key}=${encodeURIComponent(String(val).trim()).replace(/%20/g, "+")}&`;
    }
  }
  paramString = paramString.slice(0, -1);
  if (passphrase) {
    paramString += `&passphrase=${encodeURIComponent(passphrase.trim()).replace(/%20/g, "+")}`;
  }

  const computedSignature = crypto.createHash("md5").update(paramString).digest("hex");
  return computedSignature === receivedSignature;
}

/**
 * Callable function to generate an MD5 signature for Payfast checkout.
 * Credentials are stored in Cloud Secret Manager — never in source code.
 */
export const generatePayfastSignature = functions
  .runWith({
    secrets: ["PAYFAST_MERCHANT_ID", "PAYFAST_MERCHANT_KEY", "PAYFAST_PASSPHRASE", "PAYFAST_ENV", "SITE_DOMAIN"],
  })
  .https.onCall((data, context) => {
    const merchantId = process.env.PAYFAST_MERCHANT_ID;
    const merchantKey = process.env.PAYFAST_MERCHANT_KEY;
    const passphrase = process.env.PAYFAST_PASSPHRASE;
    const payfastEnv = (process.env.PAYFAST_ENV || "sandbox").toLowerCase();
    const siteDomain = process.env.SITE_DOMAIN || "localhost:5173";

    if (!merchantId || !merchantKey || !passphrase) {
      throw new functions.https.HttpsError("internal", "Payment configuration is incomplete.");
    }

    const { amount, itemName, itemDescription, mPaymentId } = data;
    if (!amount || !itemName) {
      throw new functions.https.HttpsError("invalid-argument", "Missing required Payfast parameters.");
    }

    const isProduction = payfastEnv === "production";
    const notifyPath = `https://us-central1-${process.env.GCLOUD_PROJECT || ""}.cloudfunctions.net/payfastWebhook`;

    const payload: Record<string, string> = {
      merchant_id: merchantId,
      merchant_key: merchantKey,
      return_url: isProduction ? `https://${siteDomain}/admin` : `http://${siteDomain}/admin`,
      cancel_url: isProduction ? `https://${siteDomain}/cart` : `http://${siteDomain}/cart`,
      notify_url: notifyPath,
      m_payment_id: mPaymentId || `ORD-${Date.now()}`,
      amount: parseFloat(amount).toFixed(2),
      item_name: itemName,
      item_description: itemDescription || "",
    };

    let payloadString = "";
    for (const key in payload) {
      if (payload[key] !== "") {
        payloadString += `${key}=${encodeURIComponent(payload[key].trim()).replace(/%20/g, "+")}&`;
      }
    }
    payloadString += `passphrase=${encodeURIComponent(passphrase.trim()).replace(/%20/g, "+")}`;

    const signature = crypto.createHash("md5").update(payloadString).digest("hex");

    return {
      signature,
      payload,
      payfastUrl: isProduction ? PAYFAST_LIVE_URL : PAYFAST_SANDBOX_URL,
    };
  });

/**
 * Webhook (ITN) to listen for silent Payfast notifications when a payment succeeds.
 * Implements full signature validation, IP checking, and pfValid verification.
 */
export const payfastWebhook = functions
  .runWith({ secrets: ["PAYFAST_PASSPHRASE"] })
  .https.onRequest(async (req, res) => {
    const pfData: Record<string, string> = req.body;
    const passphrase = process.env.PAYFAST_PASSPHRASE || "";

    if (!pfData || Object.keys(pfData).length === 0) {
      res.status(400).send("Bad Request");
      return;
    }

    const clientIp = req.ip || req.connection.remoteAddress || "";
    const isKnownIp = PAYFAST_VALID_IPS.some((ip) => clientIp.includes(ip));

    if (!isKnownIp) {
      console.warn("Payfast webhook: rejected request from unknown IP:", clientIp);
      res.status(403).send("Forbidden");
      return;
    }

    if (!validatePayfastSignature(pfData, passphrase)) {
      console.warn("Payfast webhook: invalid signature from IP", clientIp);
      res.status(403).send("Invalid signature");
      return;
    }

    if (pfData.pfValid !== "true") {
      console.warn("Payfast webhook: pfValid is not true", pfData.pf_payment_id);
      res.status(400).send("Validation failed");
      return;
    }

    if (pfData.payment_status === "COMPLETE") {
      const orderId = pfData.m_payment_id;
      const amountGross = parseFloat(pfData.amount_gross || "0");

      if (!orderId || amountGross <= 0) {
        res.status(400).send("Invalid order data");
        return;
      }

      try {
        await admin.firestore().collection("orders").doc(orderId).set(
          {
            status: "PAID",
            payfastReference: pfData.pf_payment_id || "",
            amountPaid: pfData.amount_gross,
            buyerEmail: pfData.email_address || "",
            paidAt: admin.firestore.FieldValue.serverTimestamp(),
            webhookIp: clientIp,
            webhookValidated: true,
          },
          { merge: true }
        );

        console.log(`Payfast payment confirmed: order=${orderId}, ref=${pfData.pf_payment_id}, ip=${clientIp}`);
      } catch (error) {
        console.error("Error updating order in Firestore:", error);
        res.status(500).send("Internal error");
        return;
      }
    }

    res.status(200).send("OK");
  });
