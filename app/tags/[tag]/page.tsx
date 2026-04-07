import { getAllTags, getAllPosts } from "@/lib/posts";
import PostCard from "@/components/post/PostCard";
import { notFound } from "next/navigation";
import { generateMetadata as makeMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

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
    <main className="min-h-screen bg-[var(--color-bg-primary)] px-4 py-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-8 text-2xl font-bold text-[var(--color-text-primary)]">
          <span className="text-[var(--color-text-accent)]">#{tag}</span>
          <span className="ml-2 text-base font-normal text-[var(--color-text-muted)]">
            {posts.length} post{posts.length !== 1 ? "s" : ""}
          </span>
        </h1>
        <div className="flex flex-col gap-4">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </main>
  );
}
