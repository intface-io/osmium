import React from "react";

type HrProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLHRElement>,
  HTMLHRElement
>;

const Hr = ({}: HrProps) => {
  return <hr className="my-4" />;
};

export default Hr;
