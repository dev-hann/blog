import React from "react";
import type { TerminalLine } from "@/lib/terminal/types";

function OutputRenderer({ line }: { line: TerminalLine }) {
  switch (line.type) {
    case "input":
      return (
        <div className="output-line">
          <span className="output-accent">$ </span>
          {line.content}
        </div>
      );
    case "output":
      return (
        <div
          className="output-line"
          dangerouslySetInnerHTML={{ __html: line.content }}
        />
      );
    case "error":
      return <div className="output-line output-error">{line.content}</div>;
    case "mdx":
      return (
        <div
          className="mdx-content output-line"
          dangerouslySetInnerHTML={{ __html: line.content }}
        />
      );
    case "html":
      return (
        <div
          className="output-line"
          dangerouslySetInnerHTML={{ __html: line.content }}
        />
      );
    default:
      return null;
  }
}

export default React.memo(OutputRenderer, (prevProps, nextProps) => {
  return prevProps.line.id === nextProps.line.id &&
         prevProps.line.type === nextProps.line.type &&
         prevProps.line.content === nextProps.line.content;
});
