import { renderMDX } from "@/lib/mdx";

interface PostBodyProps {
  content: string;
}

export default function PostBody({ content }: PostBodyProps) {
  return <div className="prose-custom">{renderMDX(content)}</div>;
}
