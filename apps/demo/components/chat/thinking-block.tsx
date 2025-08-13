import { UIMessage } from "ai";
import { useEffect, useRef } from "react";
import MessageText from "./message-text";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type ThinkingBlockProps = {
  message: UIMessage;
  isThinkingDone: boolean;
};

const ThinkingBlock = ({ message, isThinkingDone }: ThinkingBlockProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isAtBottomRef = useRef(true);

  const thinkingText = message.parts
    .filter((part) => part.type === "reasoning")
    .map((part) => part.text)
    .join("");

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    isAtBottomRef.current = scrollTop + clientHeight >= scrollHeight - 1;
  };

  useEffect(() => {
    if (scrollRef.current && isAtBottomRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [thinkingText]);

  return (
    <Accordion type="single" collapsible defaultValue="thinking-content">
      <AccordionItem value="thinking-content">
        <AccordionTrigger className="grow-0">
          {isThinkingDone ? "Thoughts" : "Thinking"}
        </AccordionTrigger>
        <AccordionContent>
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex flex-col gap-2 max-h-[120px] overflow-y-auto pr-4"
          >
            <MessageText>{thinkingText}</MessageText>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ThinkingBlock;
