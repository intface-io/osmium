"use client";
import { MessageList } from "./message-list";
import { MessageInput } from "./message-input";
import type { Message } from "@ai-sdk/react";
import { useEffect, useRef, useState } from "react";

type ChatProps = {
  messages: Message[];
  onSend: (message: string) => void;
};

const Chat = ({ messages, onSend }: ChatProps) => {
  const messageListRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const lastUserMessageRef = useRef<HTMLDivElement>(null);
  const [lastUserMessageIndex, setLastUserMessageIndex] = useState(0);

  const handleSendMessage = (message: string) => {
    onSend(message);
  };

  useEffect(() => {
    setLastUserMessageIndex(messages.findLastIndex((m) => m.role === "user"));
  }, [messages]);

  useEffect(() => {
    // Add a small delay to ensure React has assigned the ref to the new element
    setTimeout(() => {
      if (lastUserMessageRef.current) {
        // Update scroll margin dynamically
        const height =
          lastUserMessageRef.current.clientHeight < 128
            ? 24
            : -(lastUserMessageRef.current.clientHeight - 64);
        lastUserMessageRef.current.style.scrollMarginTop = `${height}px`;

        lastUserMessageRef.current.scrollIntoView({
          behavior: "smooth",
        });
      }
    }, 0); // Even 0ms delay puts it after the current render cycle
  }, [lastUserMessageIndex]);

  return (
    <div className="h-[90vh] overflow-hidden relative" ref={chatContainerRef}>
      <div className="h-full">
        <MessageList
          ref={messageListRef}
          messages={messages}
          chatContainerHeight={chatContainerRef.current?.clientHeight}
          lastUserMessageRef={lastUserMessageRef}
          lastUserMessageIndex={lastUserMessageIndex}
          lastAssistantMessageIndex={messages.findLastIndex(
            (m) => m.role === "assistant"
          )}
        />
      </div>
      <MessageInput
        className="sticky bottom-4 left-0 right-0"
        onSendMessage={handleSendMessage}
      />
    </div>
  );
};

export default Chat;
