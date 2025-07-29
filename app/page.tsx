"use client";
import Chat from "@/components/chat";
import { useState } from "react";
import { Message } from "@ai-sdk/react";

const initMessages = new Array(10).fill(0).map((_, index) =>
  index % 2 === 0
    ? {
        id: index.toString(),
        content: `Hello, how are you? ${index}`,
        role: "user" as const,
      }
    : {
        id: index.toString(),
        content: `Hello, how are you? ${index}`,
        role: "assistant" as const,
      }
);
export default function Home() {
  const [messages, setMessages] = useState<Message[]>(initMessages);

  const handleSend = (message: string) => {
    setMessages([
      ...messages,
      {
        id: messages.length.toString(),
        content: message,
        role: "user" as const,
      },
      {
        id: messages.length.toString(),
        content: [message, message].join(""),
        role: "assistant" as const,
      },
    ]);
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div className=" w-full">
        <Chat messages={messages} onSend={handleSend} />
      </div>
    </div>
  );
}
