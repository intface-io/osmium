"use client";
import React, { useState, useRef, useEffect } from "react";
import Markdown from "@/components/markdown";
import { Check, FileText, Code } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Message } from "@ai-sdk/react";

interface MessageItemProps {
  message: Message;
  className?: string;
  style?: React.CSSProperties;
  ref?: React.RefObject<HTMLDivElement | null>;
}

export function MessageItem({
  message,
  className,
  style,
  ref,
}: MessageItemProps) {
  const [copiedPlain, setCopiedPlain] = useState(false);
  const [copiedMarkdown, setCopiedMarkdown] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [showCopy, setShowCopy] = useState(false);
  const messageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Reset copied states after 2 seconds
    if (copiedPlain) {
      const timeout = setTimeout(() => setCopiedPlain(false), 2000);
      return () => clearTimeout(timeout);
    }
  }, [copiedPlain]);

  useEffect(() => {
    if (copiedMarkdown) {
      const timeout = setTimeout(() => setCopiedMarkdown(false), 2000);
      return () => clearTimeout(timeout);
    }
  }, [copiedMarkdown]);

  useEffect(() => {
    if (bookmarked) {
      const timeout = setTimeout(() => setBookmarked(false), 2000);
      return () => clearTimeout(timeout);
    }
  }, [bookmarked]);

  // Function to convert markdown to plain text
  const markdownToPlainText = (markdown: string): string => {
    // Basic conversion - replace common markdown patterns
    return markdown
      .replace(/#{1,6}\s+/g, "") // Remove headers
      .replace(/\*\*(.*?)\*\*/g, "$1") // Remove bold
      .replace(/\*(.*?)\*/g, "$1") // Remove italic
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1 ($2)") // Convert links to text with URL
      .replace(/```[a-z]*\n([\s\S]*?)```/g, "$1") // Remove code blocks
      .replace(/`([^`]+)`/g, "$1") // Remove inline code
      .replace(/^\s*>\s*/gm, "") // Remove blockquotes
      .replace(/^\s*[-*+]\s+/gm, "• ") // Convert list items to bullets
      .replace(/^\s*\d+\.\s+/gm, "• "); // Convert numbered lists to bullets
  };

  const handleCopy = (text?: string, copyType?: "plain" | "markdown") => {
    let contentToCopy = text || "";

    // If copying the whole message
    if (text === message.content && copyType === "plain") {
      contentToCopy = markdownToPlainText(contentToCopy);
    }

    navigator.clipboard.writeText(contentToCopy);

    if (copyType === "plain") {
      setCopiedPlain(true);
    } else {
      setCopiedMarkdown(true);
    }
  };

  const handleCopyPlainText = () => {
    handleCopy(message.content, "plain");
  };

  const handleCopyMarkdown = () => {
    handleCopy(message.content, "markdown");
  };

  return (
    <div
      ref={ref}
      className={cn("flex flex-col group", className)}
      onMouseEnter={() => setShowCopy(true)}
      onMouseLeave={() =>
        !copiedPlain && !copiedMarkdown && !bookmarked && setShowCopy(false)
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
          <Markdown content={message.content} id={message.id} />
        </div>
      </div>

      {/* Copy button row below the message */}
      <div
        className={cn(
          "flex mt-1 gap-2",
          message.role === "user" ? "justify-end pr-2" : "justify-start pl-2",
          showCopy || copiedPlain || copiedMarkdown || bookmarked
            ? "opacity-100"
            : "opacity-0",
          "transition-opacity duration-200"
        )}
      >
        {/* Plain text copy button */}
        <button
          onClick={handleCopyPlainText}
          className="text-xs text-muted-foreground hover:bg-gray-100 p-1 rounded-md flex items-center gap-1"
          title="Copy as plain text"
        >
          {copiedPlain ? (
            <>
              <Check className="h-3 w-3" />
              <span className="text-xs">Copied</span>
            </>
          ) : (
            <>
              <FileText className="h-3 w-3" />
              <span className="text-xs">Plain text</span>
            </>
          )}
        </button>

        {/* Markdown copy button */}
        <button
          onClick={handleCopyMarkdown}
          className="text-xs text-muted-foreground hover:bg-gray-100 p-1 rounded-md flex items-center gap-1"
          title="Copy with markdown"
        >
          {copiedMarkdown ? (
            <>
              <Check className="h-3 w-3" />
              <span className="text-xs">Copied</span>
            </>
          ) : (
            <>
              <Code className="h-3 w-3" />
              <span className="text-xs">Markdown</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
