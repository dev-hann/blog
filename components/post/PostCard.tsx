import React from "react";
import Link from "next/link";

import type { Post } from "@/types/post";

import { formatDate } from "@/lib/format";
import { highlightText } from "@/lib/highlight";

import TagBadge from "@/components/tag/TagBadge";

interface PostCardProps {
  post: Post;
  highlightQuery?: string;
}

function PostCard({ post, highlightQuery }: PostCardProps) {
  const headingId = `post-title-${post.slug}`;
  return (
    <article aria-labelledby={headingId} className="group">
      <Link
        href={`/posts/${post.slug}`}
        className="block rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-4 transition-colors hover:border-[var(--color-accent)]"
      >
        <header>
          <h3 id={headingId} className="text-lg font-semibold text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)]">
            <span dangerouslySetInnerHTML={{ __html: highlightText(post.title, highlightQuery ?? "") }} />
          </h3>
          <time dateTime={post.date} className="text-sm text-[var(--color-text-muted)]">
            {formatDate(post.date)}
          </time>
        </header>
        {post.summary && (
          <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
            <span dangerouslySetInnerHTML={{ __html: highlightText(post.summary, highlightQuery ?? "") }} />
          </p>
        )}
        <div className="mt-2 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <TagBadge key={tag} tag={tag} asLink={false} />
          ))}
        </div>
      </Link>
    </article>
  );
}

export default React.memo(PostCard, (prevProps, nextProps) => {
  return prevProps.post.slug === nextProps.post.slug &&
         prevProps.post.title === nextProps.post.title &&
         prevProps.post.summary === nextProps.post.summary &&
         prevProps.post.tags === nextProps.post.tags;
});
