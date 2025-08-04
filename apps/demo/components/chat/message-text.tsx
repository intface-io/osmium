import Markdown from "@/components/markdown";

const MessageText = ({ children }: { children: string }) => {
  return <Markdown content={children} />;
};

export default MessageText;
