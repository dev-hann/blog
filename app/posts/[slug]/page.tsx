import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug, getAdjacentPosts, extractHeadings } from "@/lib/posts";
import { formatDate } from "@/lib/format";
import { calculateReadingTime, formatReadingTime } from "@/lib/reading-time";
import { generateMetadata as genMeta } from "@/lib/metadata";
import { generateJsonLd } from "@/lib/structured-data";
import { SITE_CONFIG } from "@/lib/constants";
import PostBody from "@/components/post/PostBody";
import TableOfContents from "@/components/post/TableOfContents";
import Giscus from "@/components/comment/Giscus";
import TagBadge from "@/components/tag/TagBadge";
import PageContainer from "@/components/ui/PageContainer";

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
  const readingTime = calculateReadingTime(post.content);
  const readingTimeText = formatReadingTime(readingTime);

  return (
    <PageContainer maxWidth="max-w-5xl">
      <div className="flex gap-8">
        <article aria-labelledby="post-title" className="min-w-0 max-w-3xl flex-1">
          <header className="mb-8">
            <h1 id="post-title" className="text-3xl font-bold text-[var(--color-text-primary)]">
              {post.title}
            </h1>
            <div className="mt-2 flex items-center gap-4 text-sm text-[var(--color-text-muted)]">
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span>{readingTimeText}</span>
              <div className="flex gap-2">
                {post.tags.map((tag) => (
                  <TagBadge key={tag} tag={tag} />
                ))}
              </div>
            </div>
          </header>

          <PostBody content={post.content} />

          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: generateJsonLd({
                "@context": "https://schema.org",
                "@type": "BlogPosting",
                headline: post.title,
                datePublished: post.date,
                description: post.summary,
                keywords: post.tags.join(", "),
                author: { "@type": "Person", name: SITE_CONFIG.author },
              }),
            }}
          />

          <nav aria-label="Posts navigation" aria-describedby="post-title" className="mt-12 flex justify-between border-t border-[var(--color-border)] pt-6">
            {prev ? (
              <Link
                href={`/posts/${prev.slug}`}
                aria-label={`Previous post: ${prev.title}`}
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
                aria-label={`Next post: ${next.title}`}
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
    </PageContainer>
  );
}
