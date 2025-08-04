import React from "react";

type AProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>;

const A = ({ children, ...props }: AProps) => {
  return (
    <a className="underline" target="_blank" {...props}>
      {children}
    </a>
  );
};

export default A;
