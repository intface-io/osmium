import { streamText, UIMessage, convertToModelMessages } from "ai";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";

const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
});

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: openrouter("deepseek/deepseek-r1:free"),
    messages: convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse({
    sendReasoning: true,
  });
}
