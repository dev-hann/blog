import { NextResponse } from "next/server";
import { getPostBySlug } from "@/lib/posts";
import { renderMDX } from "@/lib/mdx";
import { createElement, type ReactNode } from "react";

function SimpleLink({
  href,
  children,
  ...rest
}: {
  href?: string;
  children?: ReactNode;
  [key: string]: unknown;
}) {
  const isExternal = href?.startsWith("http");
  return createElement(
    "a",
    {
      href,
      target: isExternal ? "_blank" : undefined,
      rel: isExternal ? "noopener noreferrer" : undefined,
      ...rest,
    },
    children
  );
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  let post;
  try {
    post = getPostBySlug(slug);
  } catch {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  let html = "";
  try {
    const { prerenderToNodeStream } = await import("react-dom/static");
    const element = renderMDX(post.content, { a: SimpleLink });
    const { prelude } = await prerenderToNodeStream(element);
    const chunks: Buffer[] = [];
    for await (const chunk of prelude) {
      chunks.push(Buffer.from(chunk));
    }
    html = Buffer.concat(chunks).toString("utf-8");
  } catch (e) {
    html = `<p style="color:var(--color-error)">Error rendering MDX: ${String(e)}</p>`;
  }

  return NextResponse.json({
    slug: post.slug,
    title: post.title,
    date: post.date,
    tags: post.tags,
    summary: post.summary,
    html,
  });
}
