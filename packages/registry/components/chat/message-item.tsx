"use client";
import React, { useState, useRef, useEffect } from "react";
import MessageText from "./message-text";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";
import type { UIMessage } from "@ai-sdk/react";

interface MessageItemProps {
  message: UIMessage;
  className?: string;
  style?: React.CSSProperties;
  ref?: React.Ref<HTMLDivElement>;
}

export function MessageItem({
  message,
  className,
  style,
  ref,
}: MessageItemProps) {
  const [copied, setCopied] = useState(false);
  const [showCopy, setShowCopy] = useState(message.role === "assistant");
  const messageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (copied) {
      const timeout = setTimeout(() => {
        setCopied(false);
        if (message.role === "user") {
          setShowCopy(false);
        }
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [copied]);

  const handleCopy = () => {
    navigator.clipboard.writeText(
      message.parts
        .filter((part) => part.type === "text")
        .map((part) => part.text)
        .join("")
    );
    setCopied(true);
  };

  return (
    <div
      ref={ref}
      className={cn(
        "flex flex-col group",
        className,
        message.role === "user" && "mt-6"
      )}
      onMouseEnter={() => setShowCopy(true)}
      onMouseLeave={() =>
        message.role === "user" && !copied && setShowCopy(false)
      }
      style={style}
    >
      <div
        className={`flex ${
          message.role === "user" ? "justify-end" : "justify-start"
        }`}
      >
        <div
          ref={messageRef}
          className={`rounded-lg p-4 whitespace-pre-wrap flex flex-col relative ${
            message.role === "user"
              ? "bg-primary text-primary-foreground max-w-[80%]"
              : "bg-muted max-w-full"
          }`}
        >
          <MessageText>
            {message.parts
              .filter((part) => part.type === "text")
              .map((part) => part.text)
              .join("")}
          </MessageText>
        </div>
      </div>
      <div
        className={cn(
          "flex mt-1 gap-2",
          message.role === "user" ? "justify-end pr-2" : "justify-start pl-2",
          showCopy || copied ? "opacity-100" : "opacity-0",
          "transition-opacity duration-200"
        )}
      >
        <button
          onClick={handleCopy}
          className="text-xs text-muted-foreground hover:bg-gray-100 p-1 rounded-sm flex items-center gap-1"
        >
          {copied ? (
            <>
              <Check className="h-3 w-3" />
              <span className="text-xs">Copied</span>
            </>
          ) : (
            <>
              <Copy className="h-3 w-3" />
              <span className="text-xs">Copy</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
