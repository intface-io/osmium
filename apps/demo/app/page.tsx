"use client";
import { useChat } from "@ai-sdk/react";
import Chat from "@/components/chat";
import { useEffect } from "react";

export default function Home() {
  const { messages: chatMessages, sendMessage, status, stop } = useChat();

  const handleSend = async (message: string) => {
    sendMessage({ text: message });
  };

  const handleStop = () => {
    stop();
  };

  useEffect(() => {
    console.log(chatMessages);
  }, [chatMessages]);

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
