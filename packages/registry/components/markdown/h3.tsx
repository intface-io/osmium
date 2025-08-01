import React from "react";

type H3Props = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
>;

const H3 = ({ children }: H3Props) => {
  return <h3 className="text-lg font-bold leading-12">{children}</h3>;
};

export default H3;
