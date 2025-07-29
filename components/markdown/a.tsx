import React from "react";
import { Link } from "lucide-react";

type AProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>;

const A = ({ children }: AProps) => {
  return (
    <a className="inline-flex items-center gap-x-2 bg-gray-300 px-2 rounded-sm w-fit hover:bg-gray-400">
      <Link className="w-4 h-4" />
      {children}
    </a>
  );
};

export default A;
