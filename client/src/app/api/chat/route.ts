import OpenAI from "openai";
import { AssistantResponse } from "ai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(request: Request) {
  const input: { threadId: string | null; message: string } = await request.json();

  const threadId = input.threadId ?? (await openai.beta.threads.create({})).id;

  const createdMessage = await openai.beta.threads.messages.create(threadId, {
    role: "user",
    content: input.message,
  });

  return AssistantResponse(
    { threadId, messageId: createdMessage.id },
    async ({ forwardStream }) => {
      const runStream = openai.beta.threads.runs.stream(threadId, {
        assistant_id:
          process.env.OPENAI_ASSISTANT_ID ??
          (() => {
            throw new Error("Assistant id not set");
          })(),
      });

      await forwardStream(runStream);
    }
  );
}
