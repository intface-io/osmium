import React from "react";

type PProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLParagraphElement>,
  HTMLParagraphElement
>;

const P = ({ children }: PProps) => {
  return <p className="leading-normal break-words">{children}</p>;
};

export default P;
