import React from "react";

type H6Props = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
>;

const H6 = ({ children }: H6Props) => {
  return <h5 className="text-sm font-bold">{children}</h5>;
};

export default H6;
