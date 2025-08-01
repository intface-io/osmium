import React from "react";

type H2Props = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
>;

const H2 = ({ children }: H2Props) => {
  return <h2 className="text-xl font-bold leading-14">{children}</h2>;
};

export default H2;
