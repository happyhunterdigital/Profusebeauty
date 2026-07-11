// File: functions/src/deepseekService.ts
const DEEPSEEK_URL = "https://api.deepseek.com/v1/chat/completions";

interface DeepSeekMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export async function callDeepSeek(
  messages: DeepSeekMessage[],
  options: { temperature?: number; maxRetries?: number } = {}
): Promise<string> {
  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) throw new Error("DEEPSEEK_API_KEY is missing from environment");

  const payload = { model: "deepseek-chat", messages, temperature: options.temperature ?? 0.6 };
  const retries = options.maxRetries ?? 2;
  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const response = await fetch(DEEPSEEK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error(`DeepSeek API error: ${response.status} - ${await response.text()}`);
      const data = await response.json() as any;
      const content = data?.choices?.[0]?.message?.content;
      if (!content) throw new Error("DeepSeek returned empty content");
      return content;
    } catch (err: any) {
      lastError = err;
      if (attempt < retries) await new Promise(r => setTimeout(r, 800 * (attempt + 1)));
    }
  }
  throw lastError || new Error("DeepSeek call failed after retries");
}

export async function callDeepSeekChat(
  systemPrompt: string,
  history: Array<{ role: "user" | "model"; parts: Array<{ text: string }> }>
): Promise<{ reply: string }> {
  const messages: DeepSeekMessage[] = [
    { role: "system", content: systemPrompt },
    ...history.map((msg) => ({
      role: (msg.role === "model" ? "assistant" : "user") as "user" | "assistant",
      content: msg.parts[0].text,
    })),
  ];
  const reply = await callDeepSeek(messages, { temperature: 0.6 });
  return { reply };
}
