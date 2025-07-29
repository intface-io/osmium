"use client";
import React from "react";
import { MessageItem } from "./message-item";
import type { Message } from "@ai-sdk/react";

interface MessageListProps {
  messages: Message[];
  onSendMessage?: (message: string) => void;
  ref: React.RefObject<HTMLDivElement | null>;
  chatContainerHeight?: number;
  lastUserMessageRef: React.RefObject<HTMLDivElement | null>;
  lastUserMessageIndex?: number;
  lastAssistantMessageIndex?: number;
}

export function MessageList({
  messages,
  ref,
  lastUserMessageRef,
  lastUserMessageIndex,
  lastAssistantMessageIndex,
  chatContainerHeight = 0,
}: MessageListProps) {
  return (
    <div className="flex flex-col gap-4 relative min-h-full h-full w-full p-4 overflow-y-scroll pb-[160px]">
      <div className="w-2/3 mx-auto" ref={ref}>
        {messages.map((message, index) => (
          <MessageItem
            key={index}
            style={{
              minHeight:
                lastAssistantMessageIndex === index
                  ? `${chatContainerHeight * 0.7}px`
                  : undefined,
            }}
            message={message}
            ref={
              lastUserMessageIndex === index ? lastUserMessageRef : undefined
            }
          />
        ))}
      </div>
    </div>
  );
}
