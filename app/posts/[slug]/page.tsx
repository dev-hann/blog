import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug, getAdjacentPosts, extractHeadings } from "@/lib/posts";
import PostBody from "@/components/post/PostBody";
import TableOfContents from "@/components/post/TableOfContents";
import Giscus from "@/components/comment/Giscus";
import Link from "next/link";
import { generateMetadata as genMeta } from "@/lib/metadata";
import { formatDate } from "@/lib/format";
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
    return genMeta({ title: post.title, description: post.summary, path: `/posts/${slug}` });
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
  const headings = extractHeadings(post.content);

  return (
    <div className="bg-[var(--color-bg-primary)] px-4 py-8">
      <div className="mx-auto flex max-w-5xl gap-8">
        <article className="min-w-0 max-w-3xl flex-1">
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-[var(--color-text-primary)]">
              {post.title}
            </h1>
            <div className="mt-2 flex items-center gap-4 text-sm text-[var(--color-text-muted)]">
              <time>{formatDate(post.date)}</time>
              <div className="flex gap-2">
                {post.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/tags/${tag}`}
                    className="rounded bg-[var(--color-bg-tertiary)] px-2 py-0.5 text-xs text-[var(--color-text-accent)] transition-colors hover:bg-[var(--color-bg-secondary)]"
                  >
                    {tag}
                  </Link>
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
          <Giscus />
        </article>
        <aside className="hidden w-56 shrink-0 pt-24 lg:block">
          <TableOfContents headings={headings} />
        </aside>
      </div>
    </div>
  );
}
