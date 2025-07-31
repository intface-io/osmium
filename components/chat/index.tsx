"use client";
import { MessageList } from "./message-list";
import { MessageInput } from "./message-input";
import type { UIMessage } from "@ai-sdk/react";
import { useEffect, useRef, useState } from "react";

type ChatProps = {
  messages: UIMessage[];
  onSend: (message: string) => void;
  isStreaming: boolean;
  isPending: boolean;
  onStop: () => void;
};

const Chat = ({
  messages,
  onSend,
  isStreaming,
  isPending,
  onStop,
}: ChatProps) => {
  const messageListRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const lastUserMessageRef = useRef<HTMLDivElement>(null);
  const lastAssistantMessageRef = useRef<HTMLDivElement>(null);
  const bottomSentinelRef = useRef<HTMLDivElement>(null);
  const [lastUserMessageIndex, setLastUserMessageIndex] = useState(0);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const [lastMessageRole, setLastMessageRole] = useState<
    "user" | "assistant"
  >();

  const handleSendMessage = (message: string) => {
    lastUserMessageRef.current = null;
    onSend(message);
  };

  const scrollToBottom = () => {
    setIsAtBottom(true);
    messageListRef.current?.scrollTo({
      top: messageListRef.current?.scrollHeight,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    setLastUserMessageIndex(messages.findLastIndex((m) => m.role === "user"));
    setLastMessageRole(
      messages[messages.length - 1]?.role as "user" | "assistant"
    );
  }, [messages]);

  useEffect(() => {
    if (lastUserMessageRef.current) {
      if (lastUserMessageIndex === 0) {
        scrollToBottom();
        return;
      }
      const scrollMarginTop =
        lastUserMessageRef.current.clientHeight < 128
          ? 24
          : -(lastUserMessageRef.current.clientHeight - 64);
      lastUserMessageRef.current.style.scrollMarginTop = `${scrollMarginTop}px`;

      lastUserMessageRef.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [lastUserMessageIndex]);

  useEffect(() => {
    const messageListObserver = new IntersectionObserver(
      (entries, observer) => {
        const entry = entries[0];
        console.log("entry", entry);
        setIsAtBottom(entry.isIntersecting);
      },
      {
        root: messageListRef.current,
        threshold: 0,
      }
    );

    if (bottomSentinelRef.current) {
      messageListObserver.observe(bottomSentinelRef.current);
    }
    return () => {
      console.log("cleaning...");
      messageListObserver.disconnect();
    };
  }, [bottomSentinelRef.current]);

  return (
    <div className="h-[90vh] overflow-hidden relative" ref={chatContainerRef}>
      <div className="h-full">
        <MessageList
          ref={messageListRef}
          messages={messages}
          chatContainerHeight={chatContainerRef.current?.clientHeight}
          lastUserMessageRef={lastUserMessageRef}
          lastAssistantMessageRef={lastAssistantMessageRef}
          bottomSentinelRef={bottomSentinelRef}
          scrollToBottom={scrollToBottom}
          isAtBottom={isAtBottom}
          lastMessageRole={lastMessageRole}
          isStreaming={isStreaming}
          isPending={isPending}
        />
      </div>
      <MessageInput
        className="sticky bottom-4 left-0 right-0"
        onSendMessage={handleSendMessage}
        isPending={isPending}
        onStop={onStop}
      />
    </div>
  );
};

export default Chat;
