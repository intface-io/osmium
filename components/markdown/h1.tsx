import React from "react";

type H1Props = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
>;

const H1 = ({ children }: H1Props) => {
  return <h1 className="text-2xl font-bold leading-16">{children}</h1>;
};

export default H1;
