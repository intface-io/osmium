import { createClient } from "@/services/supabase/client";
import { Message } from "@/types/chat";
import {
  queryOptions,
  experimental_streamedQuery as streamedQuery,
} from "@tanstack/react-query";

const messageIdMap = new Map<string, string>();
const send = async ({
  message: { threadId, content, model },
  options,
}: {
  message: { threadId: string; content: string; model?: string };
  options?: {
    signal?: AbortSignal;
  };
}) => {
  const supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const response = await fetch(process.env.NEXT_PUBLIC_CHAT_API_URL!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.access_token}`,
    },
    body: JSON.stringify({
      threadId,
      message: {
        role: "user",
        content,
      },
      model,
    }),
    signal: options?.signal,
  });

  if (!response.ok) {
    throw new Error(`Server responded with ${response.status}`);
  }
  // Create a reader from the stream
  const reader = response.body?.getReader();
  const messageId = response.headers.get("X-Message-Id");

  if (messageId) {
    messageIdMap.set(threadId, messageId);
  }

  if (!reader) {
    throw new Error("No reader found");
  }

  const decoder = new TextDecoder();
  let responseContent = "";
  let hasStartedStreaming = false;

  return {
    async *[Symbol.asyncIterator]() {
      // Read the stream chunk by chunk
      while (true) {
        try {
          const { done, value } = await reader.read();
          if (done) break;

          // Decode the chunk
          const chunk = decoder.decode(value, { stream: true });
          responseContent += chunk;
          hasStartedStreaming = true;

          yield chunk;
        } catch (error) {
          console.error("Error reading stream:", error);
          break;
        }
      }
    },
    get content() {
      return responseContent;
    },
    get hasStartedStreaming() {
      return hasStartedStreaming;
    },
    get messageId() {
      return messageId;
    },
  };
};

const sendMessage = ({
  threadId,
  streamId,
  enabled = false,
  model,
}: {
  threadId: string;
  streamId?: string | null;
  enabled?: boolean;
  model?: string;
}) => {
  return queryOptions({
    enabled,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    queryKey: ["sendMessage", threadId, streamId],
    queryFn: streamedQuery({
      queryFn: async ({ client, signal }) => {
        const message = client.getQueryData<Message>([
          "messageToSend",
          threadId,
        ]);

        if (!message) {
          throw new Error("No message found");
        }

        const response = await send({
          message: {
            threadId,
            content: message.content,
            model,
          },
          options: { signal },
        });

        client.setQueryData(["streamedMessageId", threadId], {
          messageId: response.messageId,
        });

        return response;
      },
    }),
  });
};

export { sendMessage };
