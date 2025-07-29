import React, { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { SendHorizonal, LoaderCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface MessageInputProps {
  onSubmit?: (e: React.FormEvent) => void;
  onSendMessage?: (content: string) => void;
  isLoading?: boolean;
  className?: string;
}

export function MessageInput({
  onSendMessage,
  isLoading,
  onSubmit,
  className,
}: MessageInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [value, setValue] = useState("");

  // Auto-resize textarea based on content
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

    if (onSubmit) {
      onSubmit(e);
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
        className="flex flex-col gap-2 border-2 rounded-md p-2 bg-white"
      >
        <Textarea
          placeholder="Ask me anything you want to understand better..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
          className="flex-grow resize-none min-h-[48px] max-h-[200px] border-none shadow-none focus-visible:ring-0"
          ref={textareaRef}
        />
        <div className="flex justify-end">
          <Button type="submit" disabled={isLoading || !value?.trim()}>
            {isLoading ? (
              <LoaderCircle className="animate-spin" size={16} />
            ) : (
              <SendHorizonal size={16} />
            )}
            send
          </Button>
        </div>
      </form>
    </div>
  );
}
