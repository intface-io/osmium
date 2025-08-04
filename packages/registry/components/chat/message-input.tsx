import React, { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Square, ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ChatStatus } from "ai";

interface MessageInputProps {
  onSendMessage?: (content: string) => void;
  onStop: () => void;
  className?: string;
  status: ChatStatus;
}

export function MessageInput({
  status,
  onSendMessage,
  className,
  onStop,
}: MessageInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [value, setValue] = useState("");

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [value]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!value) return;

    if (!value.trim()) return;

    if (onSendMessage) {
      onSendMessage(value.trim());
    }

    setValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className={cn("w-2/3 mx-auto pb-4", className)}>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 border rounded-md p-2 bg-white"
      >
        <Textarea
          placeholder="Ask anything"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={status === "submitted" || status === "streaming"}
          className="flex-grow resize-none min-h-[48px] max-h-[200px] border-none shadow-none focus-visible:ring-0"
          ref={textareaRef}
        />
        <div className="flex justify-end">
          {status === "submitted" || status === "streaming" ? (
            <Button
              size="icon"
              type="button"
              onClick={onStop}
              className="cursor-pointer"
            >
              <Square className="size-4" fill="#fff" />
            </Button>
          ) : (
            <Button
              type="submit"
              size="icon"
              disabled={!value?.trim()}
              className="cursor-pointer"
            >
              <ArrowUp className="size-5" />
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
