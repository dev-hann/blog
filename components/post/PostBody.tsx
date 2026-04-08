import React from "react";
import { renderMDX } from "@/lib/mdx";

interface PostBodyProps {
  content: string;
}

function PostBody({ content }: PostBodyProps) {
  return <div className="mdx-content">{renderMDX(content)}</div>;
}

export default React.memo(PostBody, (prevProps, nextProps) => {
  return prevProps.content === nextProps.content;
});
