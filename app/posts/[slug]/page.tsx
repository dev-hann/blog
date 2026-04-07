import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug, getAdjacentPosts } from "@/lib/posts";
import PostBody from "@/components/post/PostBody";
import Link from "next/link";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = getPostBySlug(slug);
    return { title: post.title, description: post.summary };
  } catch {
    return { title: "Post Not Found" };
  }
}

export default async function PostDetailPage({ params }: PageProps) {
  const { slug } = await params;
  let post;
  try {
    post = getPostBySlug(slug);
  } catch {
    notFound();
  }

  const { prev, next } = getAdjacentPosts(slug);

  return (
    <main className="min-h-screen bg-[var(--color-bg-primary)] px-4 py-8">
      <article className="mx-auto max-w-3xl">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-[var(--color-text-primary)]">
            {post.title}
          </h1>
          <div className="mt-2 flex items-center gap-4 text-sm text-[var(--color-text-muted)]">
            <time>{post.date}</time>
            <div className="flex gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded bg-[var(--color-bg-tertiary)] px-2 py-0.5 text-xs text-[var(--color-text-accent)]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </header>

        <PostBody content={post.content} />

        <nav className="mt-12 flex justify-between border-t border-[var(--color-border)] pt-6">
          {prev ? (
            <Link
              href={`/posts/${prev.slug}`}
              className="text-sm text-[var(--color-text-accent)] hover:underline"
            >
              &larr; {prev.title}
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              href={`/posts/${next.slug}`}
              className="text-sm text-[var(--color-text-accent)] hover:underline"
            >
              {next.title} &rarr;
            </Link>
          ) : (
            <span />
          )}
        </nav>
      </article>
    </main>
  );
}
