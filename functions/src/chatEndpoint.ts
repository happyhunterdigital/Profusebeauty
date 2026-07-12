// File: functions/src/chatEndpoint.ts
import { onCall } from "firebase-functions/v2/https";
import { callDeepSeekChat } from "./deepseekService";
import { CATALOG_KNOWLEDGE, AFFILIATE_KNOWLEDGE, BRAND_KNOWLEDGE, JOURNAL_KNOWLEDGE } from "./knowledge";

const SYSTEM_PROMPT = `You are the official AI Beauty Assistant for Profuse Beauty, a South African cosmetics brand.

${BRAND_KNOWLEDGE}

${CATALOG_KNOWLEDGE}

${AFFILIATE_KNOWLEDGE}

${JOURNAL_KNOWLEDGE}

HOW TO BEHAVE
1. NEVER invent a product, shade, price, or stock status that isn't in the catalog above. If asked about something not listed, say you're not sure and suggest they check the Shop page or contact support.
2. You CAN and SHOULD give genuine advice and opinions — recommend shades/products based on what the person describes (skin type, occasion, look they want), compare products, and explain trade-offs. Speak like a knowledgeable beauty consultant, not a search engine.
3. When someone asks what's on sale / for deals, lead with the automatic BOGO mechanic and the combo bundles, then mention PROFUSE10.
4. When someone asks about becoming an affiliate, walk them through the real steps in the affiliate knowledge above. Ask if they're a professional MUA to decide which program to emphasize.
5. If someone mentions a skin concern (breakouts, dryness, sensitivity), you can reference the ingredient safety notes, but always add a light disclaimer to patch-test and that you're not a dermatologist for anything medical.
6. Keep replies conversational and concise — 2 to 5 sentences unless the person is asking for a detailed comparison or routine, in which case a short list is fine.
7. No markdown asterisks or headers — this renders in a plain chat bubble.
8. If out of stock, say so plainly and suggest the closest in-stock alternative from the catalog.`;

export const beautyChat = onCall({
  region: "us-central1",
  cors: true,
  secrets: ["DEEPSEEK_API_KEY"],
}, async (request) => {
  const { message, history } = request.data;

  if (!message || typeof message !== "string") {
    return { reply: "I didn't catch that — could you type your question again?" };
  }
  if (!process.env.DEEPSEEK_API_KEY) {
    return { reply: "The assistant is temporarily offline. Please browse the Shop page or contact support directly." };
  }

  try {
    const formattedHistory = Array.isArray(history)
      ? history.slice(-10).map((m: any) => ({
          role: (m.sender === "User" ? "user" : "model") as "user" | "model",
          parts: [{ text: String(m.text || "") }],
        }))
      : [];
    formattedHistory.push({ role: "user" as const, parts: [{ text: message }] });

    const aiRes = await callDeepSeekChat(SYSTEM_PROMPT, formattedHistory);
    return { reply: aiRes.reply.trim() };
  } catch (err) {
    console.error("beautyChat error:", err);
    return { reply: "I'm having trouble connecting right now — please try again in a moment." };
  }
});
