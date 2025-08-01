import React from "react";
import { Link } from "lucide-react";

type AProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>;

const A = ({ children, ...props }: AProps) => {
  return (
    <a {...props}>
      <Link className="w-4 h-4" />
      {children}
    </a>
  );
};

export default A;
