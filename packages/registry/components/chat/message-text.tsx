import { cn } from "@/lib/utils";
import Markdown from "@/components/markdown";

const MessageText = ({
  children,
  className,
  key,
}: {
  children: string;
  className?: string;
  key?: any;
}) => {
  return (
    <div className={cn("whitespace-pre-wrap", className)}>
      <Markdown content={children} key={key} />
    </div>
  );
};

export default MessageText;
