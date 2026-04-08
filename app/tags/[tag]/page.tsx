import React, { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllTags, getAllPosts } from "@/lib/posts";
import { generateMetadata as makeMetadata } from "@/lib/metadata";
import { generateJsonLd } from "@/lib/structured-data";
import { SITE_CONFIG } from "@/lib/constants";
import PostList from "@/components/post/PostList";
import PageContainer from "@/components/ui/PageContainer";
import PageHeading from "@/components/ui/PageHeading";

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

  const headingId = `tag-heading-${tag}`;

  return (
    <PageContainer>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: generateJsonLd({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: `#${tag}`,
            description: `Posts tagged with ${tag}`,
            url: `${SITE_CONFIG.url}/tags/${tag}`,
          }),
        }}
      />
      <section aria-labelledby={headingId}>
        <PageHeading id={headingId}>
          <span className="text-[var(--color-text-accent)]">#{tag}</span>
          <span className="ml-2 text-base font-normal text-[var(--color-text-muted)]">
            {posts.length} post{posts.length !== 1 ? "s" : ""}
          </span>
        </PageHeading>
      <Suspense>
        <PostList posts={posts} />
      </Suspense>
      </section>
    </PageContainer>
  );
}
