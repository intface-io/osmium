import React from "react";

type H5Props = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
>;

const H5 = ({ children }: H5Props) => {
  return <h5 className="text-sm font-bold">{children}</h5>;
};

export default H5;
