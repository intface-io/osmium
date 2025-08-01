import React from "react";

type StrongProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLElement>,
  HTMLElement
>;

const Strong = ({ children }: StrongProps) => {
  return <strong className="contents">{children}</strong>;
};

export default Strong;
