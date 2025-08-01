import React from "react";

type LiProps = React.DetailedHTMLProps<
  React.LiHTMLAttributes<HTMLLIElement>,
  HTMLLIElement
>;

const Li = ({ children }: LiProps) => {
  return <li className="leading-normal">{children}</li>;
};

export default Li;
