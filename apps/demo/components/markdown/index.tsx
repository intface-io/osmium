import { marked } from "marked";
import { memo, useMemo } from "react";
import { default as RcMarkdown } from "react-markdown";
import Li from "./li";
import Ul from "./ul";
import Ol from "./ol";
import H1 from "./h1";
import H2 from "./h2";
import H3 from "./h3";
import H4 from "./h4";
import H5 from "./h5";
import H6 from "./h6";
import Strong from "./strong";
import Hr from "./hr";
import A from "./a";
import Code from "./code";
import P from "./p";

function parseMarkdownIntoBlocks(markdown: string): string[] {
  const tokens = marked.lexer(markdown);
  return tokens.map((token) => token.raw);
}

const MemoizedMarkdownBlock = memo(
  ({ content }: { content: string }) => {
    return (
      <RcMarkdown
        components={{
          a: A,
          p: P,
          li: Li,
          ul: Ul,
          ol: Ol,
          h1: H1,
          h2: H2,
          h3: H3,
          h4: H4,
          h5: H5,
          h6: H6,
          hr: Hr,
          code: Code,
          strong: Strong,
        }}
      >
        {content}
      </RcMarkdown>
    );
  },
  (prevProps, nextProps) => {
    if (prevProps.content !== nextProps.content) return false;
    return true;
  },
);

MemoizedMarkdownBlock.displayName = "MemoizedMarkdownBlock";

const Markdown = memo(({ content, id }: { content: string; id: string }) => {
  const blocks = useMemo(() => parseMarkdownIntoBlocks(content), [content]);

  return blocks.map((block, index) => (
    <MemoizedMarkdownBlock content={block} key={`${id}-block_${index}`} />
  ));
});

Markdown.displayName = "Markdown";

export default Markdown;
