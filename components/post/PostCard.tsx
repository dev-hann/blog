import Link from "next/link";
import type { Post } from "@/types/post";
import { formatDate } from "@/lib/format";

export default function PostCard({ post }: { post: Post }) {
  return (
    <article className="group">
      <Link
        href={`/posts/${post.slug}`}
        className="block rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-4 transition-colors hover:border-[var(--color-accent)]"
      >
        <h3 className="text-lg font-semibold text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)]">
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
            <span
              key={tag}
              className="rounded bg-[var(--color-bg-tertiary)] px-2 py-0.5 text-xs text-[var(--color-text-accent)]"
            >
              {tag}
            </span>
          ))}
        </div>
      </Link>
    </article>
  );
}
