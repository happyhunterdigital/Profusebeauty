import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as crypto from "crypto";

admin.initializeApp();

// AI Beauty Assistant — see chatEndpoint.ts / knowledge.ts / deepseekService.ts
export { beautyChat } from "./chatEndpoint";

// Payfast Credentials provided by user
const PAYFAST_MERCHANT_ID = "19399931";
const PAYFAST_MERCHANT_KEY = "5bn51ekewsvpu";
const PAYFAST_PASSPHRASE = "Marciak-1234Profuse";

/**
 * Callable function to generate an MD5 signature for Payfast checkout.
 * This runs securely on the backend so the passphrase is never exposed to the browser.
 */
export const generatePayfastSignature = functions.https.onCall((data, context) => {
  const { amount, itemName, itemDescription, mPaymentId } = data;

  if (!amount || !itemName) {
    throw new functions.https.HttpsError("invalid-argument", "Missing required Payfast parameters.");
  }

  // Construct payload exactly as it will be submitted in the HTML form
  const payload: Record<string, string> = {
    merchant_id: PAYFAST_MERCHANT_ID,
    merchant_key: PAYFAST_MERCHANT_KEY,
    // TODO: Change these URLs to your live domain before deploying to production
    return_url: "http://localhost:5173/admin", 
    cancel_url: "http://localhost:5173/cart",
    // Replace 'your-project-id' with your actual Firebase Project ID once deployed
    notify_url: "https://us-central1-your-project-id.cloudfunctions.net/payfastWebhook",
    m_payment_id: mPaymentId || Date.now().toString(),
    amount: parseFloat(amount).toFixed(2),
    item_name: itemName,
    item_description: itemDescription || "",
  };

  // Convert payload to URI encoded string as per Payfast specifications
  let payloadString = "";
  for (const key in payload) {
    if (payload[key] !== "") {
      payloadString += `${key}=${encodeURIComponent(payload[key].trim()).replace(/%20/g, "+")}&`;
    }
  }

  // Append passphrase at the very end
  payloadString += `passphrase=${encodeURIComponent(PAYFAST_PASSPHRASE.trim()).replace(/%20/g, "+")}`;

  // Hash using MD5
  const signature = crypto.createHash("md5").update(payloadString).digest("hex");

  // Return both the generated signature and the constructed payload so the frontend knows exactly what to submit
  return { signature, payload };
});

/**
 * Webhook (ITN) to listen for silent Payfast notifications when a payment succeeds.
 */
export const payfastWebhook = functions.https.onRequest(async (req, res) => {
  const pfData = req.body;
  
  // Basic validation
  if (!pfData || !pfData.signature) {
    res.status(400).send("Bad Request");
    return;
  }

  // If the payment is complete, update our Firestore database!
  if (pfData.payment_status === "COMPLETE") {
    const orderId = pfData.m_payment_id;
    
    try {
      // Update the specific Order document in Firestore to PAID
      await admin.firestore().collection("orders").doc(orderId).set({
        status: "PAID",
        payfastReference: pfData.pf_payment_id,
        amountPaid: pfData.amount_gross,
        buyerEmail: pfData.email_address,
        paidAt: admin.firestore.FieldValue.serverTimestamp()
      }, { merge: true });

      console.log(`Successfully processed Payfast payment for order: ${orderId}`);
    } catch (error) {
      console.error("Error updating order in Firestore:", error);
    }
  }

  // Always respond with 200 OK so Payfast knows we received the ping
  res.status(200).send("OK");
});
