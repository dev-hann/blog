import Link from "next/link";
import type { Post } from "@/types/post";
import { formatDate } from "@/lib/format";
import TagBadge from "@/components/tag/TagBadge";

export default function PostCard({ post }: { post: Post }) {
  const headingId = `post-title-${post.slug}`;
  return (
    <article aria-labelledby={headingId} className="group">
      <Link
        href={`/posts/${post.slug}`}
        className="block rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-4 transition-colors hover:border-[var(--color-accent)]"
      >
        <h3 id={headingId} className="text-lg font-semibold text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)]">
          {post.title}
        </h3>
        <time dateTime={post.date} className="text-sm text-[var(--color-text-muted)]">
          {formatDate(post.date)}
        </time>
        {post.summary && (
          <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
            {post.summary}
          </p>
        )}
        <div className="mt-2 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <TagBadge key={tag} tag={tag} />
          ))}
        </div>
      </Link>
    </article>
  );
}
