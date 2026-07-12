"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.callDeepSeek = callDeepSeek;
exports.callDeepSeekChat = callDeepSeekChat;
// File: functions/src/deepseekService.ts
const DEEPSEEK_URL = "https://api.deepseek.com/v1/chat/completions";
async function callDeepSeek(messages, options = {}) {
    const apiKey = process.env.DEEPSEEK_API_KEY;
    if (!apiKey)
        throw new Error("DEEPSEEK_API_KEY is missing from environment");
    const payload = { model: "deepseek-chat", messages, temperature: options.temperature ?? 0.6 };
    const retries = options.maxRetries ?? 2;
    let lastError = null;
    for (let attempt = 0; attempt <= retries; attempt++) {
        try {
            const response = await fetch(DEEPSEEK_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
                body: JSON.stringify(payload),
            });
            if (!response.ok)
                throw new Error(`DeepSeek API error: ${response.status} - ${await response.text()}`);
            const data = await response.json();
            const content = data?.choices?.[0]?.message?.content;
            if (!content)
                throw new Error("DeepSeek returned empty content");
            return content;
        }
        catch (err) {
            lastError = err;
            if (attempt < retries)
                await new Promise(r => setTimeout(r, 800 * (attempt + 1)));
        }
    }
    throw lastError || new Error("DeepSeek call failed after retries");
}
async function callDeepSeekChat(systemPrompt, history) {
    const messages = [
        { role: "system", content: systemPrompt },
        ...history.map((msg) => ({
            role: (msg.role === "model" ? "assistant" : "user"),
            content: msg.parts[0].text,
        })),
    ];
    const reply = await callDeepSeek(messages, { temperature: 0.6 });
    return { reply };
}
//# sourceMappingURL=deepseekService.js.map