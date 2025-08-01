type OlProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLOListElement>,
  HTMLOListElement
>;

const Ol = ({ children }: OlProps) => {
  return <ol className="leading-0">{children}</ol>;
};

export default Ol;
