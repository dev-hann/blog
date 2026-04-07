import { renderMDX } from "@/lib/mdx";

export default function PostBody({ content }: { content: string }) {
  return <div className="mdx-content">{renderMDX(content)}</div>;
}
