type UlProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLUListElement>,
  HTMLUListElement
>;

const Ul = ({ children }: UlProps) => {
  return <ul className="leading-0">{children}</ul>;
};

export default Ul;
