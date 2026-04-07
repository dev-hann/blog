import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllTags, getAllPosts } from "@/lib/posts";
import { generateMetadata as makeMetadata } from "@/lib/metadata";
import PostList from "@/components/post/PostList";

interface PageProps {
  params: Promise<{ tag: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { tag } = await params;
  return makeMetadata({
    title: `#${tag}`,
    description: `Posts tagged with ${tag}`,
    path: `/tags/${tag}`,
  });
}

export async function generateStaticParams() {
  const tags = getAllTags();
  return Object.keys(tags).map((tag) => ({ tag }));
}

export default async function TagDetailPage({ params }: PageProps) {
  const { tag } = await params;
  const allTags = getAllTags();

  if (!allTags[tag]) {
    notFound();
  }

  const posts = getAllPosts().filter((p) =>
    p.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
  );

  return (
    <div className="bg-[var(--color-bg-primary)] px-4 py-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-8 text-2xl font-bold text-[var(--color-text-primary)]">
          <span className="text-[var(--color-text-accent)]">#{tag}</span>
          <span className="ml-2 text-base font-normal text-[var(--color-text-muted)]">
            {posts.length} post{posts.length !== 1 ? "s" : ""}
          </span>
        </h1>
        <PostList posts={posts} />
      </div>
    </div>
  );
}
