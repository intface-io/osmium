import React from "react";

type H4Props = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
>;

const H4 = ({ children }: H4Props) => {
  return <h4 className="text-base font-bold">{children}</h4>;
};

export default H4;
