"use client";
import React from "react";
import { MessageItem } from "./message-item";
import type { UIMessage } from "@ai-sdk/react";
import { ArrowDown, LoaderCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { ChatStatus } from "ai";

interface MessageListProps {
  messages: UIMessage[];
  onSendMessage?: (message: string) => void;
  ref: React.RefObject<HTMLDivElement | null>;
  chatContainerHeight?: number;
  lastUserMessageRef: React.RefObject<HTMLDivElement | null>;
  lastAssistantMessageRef: React.RefObject<HTMLDivElement | null>;
  scrollToBottom: () => void;
  isAtBottom: boolean;
  lastMessageRole?: "user" | "assistant";
  bottomSentinelRef: React.RefObject<HTMLDivElement | null>;
  status: ChatStatus;
}

export function MessageList({
  messages,
  ref,
  lastUserMessageRef,
  lastAssistantMessageRef,
  chatContainerHeight = 0,
  scrollToBottom,
  isAtBottom,
  lastMessageRole,
  bottomSentinelRef,
  status,
}: MessageListProps) {
  return (
    <div className="relative h-full w-full overflow-y-scroll pb-48" ref={ref}>
      <div className="w-2/3 mx-auto">
        {messages.map((message, index) => (
          <MessageItem
            key={index}
            message={message}
            ref={(node) => {
              if (index === messages.length - 1) {
                if (message.role === "user") {
                  lastUserMessageRef.current = node;
                } else {
                  lastAssistantMessageRef.current = node;
                }
              }
            }}
          />
        ))}
        {status === "submitted" && (
          <div className="">
            <LoaderCircle className="animate-spin" size={16} />
          </div>
        )}
        {
          <div
            ref={bottomSentinelRef}
            style={{
              minHeight:
                messages.length >= 2
                  ? chatContainerHeight *
                    (lastMessageRole === "user"
                      ? 0.7
                      : status === "streaming"
                      ? 0.7
                      : 0.55)
                  : undefined,
            }}
          />
        }
      </div>

      <div
        className={cn(
          "sticky -bottom-8 left-1/2 -translate-x-1/2 w-8 h-8 z-50 bg-white cursor-pointer rounded-full p-1 transition-all duration-300 hover:opacity-90",
          isAtBottom && "hidden"
        )}
        onClick={scrollToBottom}
      >
        <ArrowDown className="h-full w-full" />
      </div>
    </div>
  );
}
