"use client";
import Chat from "@/components/chat";
import { useState, useRef } from "react";
import { useChat, UIMessage } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";

export default function Home() {
  const [messages, setMessages] = useState<UIMessage[]>([]);
  const [isPending, setIsPending] = useState(false);

  const {
    messages: chatMessages,
    sendMessage,
    status,
    stop,
  } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
    }),
    onError: () => {
      setIsPending(false);
    },
    onFinish: () => {
      setIsPending(false);
    },
  });

  const handleSend = async (message: string) => {
    setIsPending(true);
    sendMessage({ text: message });
  };

  const handleStop = () => {
    stop();
    setIsPending(false);
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div className=" w-full">
        <Chat
          isStreaming={status === "streaming"}
          messages={chatMessages}
          onSend={handleSend}
          isPending={isPending}
          onStop={handleStop}
        />
      </div>
    </div>
  );
}
