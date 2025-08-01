"use client";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import Chat from "@/components/chat";

export default function Home() {
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
      // Handle error
    },
    onFinish: () => {
      // Handle finish
    },
  });

  const handleSend = async (message: string) => {
    sendMessage({ text: message });
  };

  const handleStop = () => {
    stop();
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <Chat
        status={status}
        messages={chatMessages}
        onSend={handleSend}
        onStop={handleStop}
      />
    </div>
  );
}
