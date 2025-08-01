import React from "react";

type CodeProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLElement>,
  HTMLElement
>;

const Code = ({ children }: CodeProps) => {
  return <code className="whitespace-pre-wrap break-all">{children}</code>;
};

export default Code;
