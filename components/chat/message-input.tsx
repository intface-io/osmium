import React, { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Square, ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface MessageInputProps {
  onSendMessage?: (content: string) => void;
  onStop: () => void;
  isPending?: boolean;
  className?: string;
}

export function MessageInput({
  onSendMessage,
  isPending,
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
          disabled={isPending}
          className="flex-grow resize-none min-h-[48px] max-h-[200px] border-none shadow-none focus-visible:ring-0"
          ref={textareaRef}
        />
        <div className="flex justify-end">
          {isPending ? (
            <Button size="icon" type="button" onClick={onStop}>
              <Square className="size-4" fill="#fff" />
            </Button>
          ) : (
            <Button type="submit" size="icon" disabled={!value?.trim()}>
              <ArrowUp className="size-5" />
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
