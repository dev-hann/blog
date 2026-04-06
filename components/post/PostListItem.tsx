import Link from "next/link";
import type { Post } from "@/types/post";

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

interface PostListItemProps extends Post {
  featured?: boolean;
}

export default function PostListItem({
  slug,
  title,
  date,
  tags,
  featured,
}: PostListItemProps) {
  return (
    <Link
      href={`/posts/${slug}`}
      className="post-list-item flex items-center gap-3 px-2 py-1.5 font-mono transition-colors"
    >
      {featured ? (
        <span className="w-4 shrink-0 text-center text-[var(--color-warning)]">
          ★
        </span>
      ) : (
        <span className="w-4 shrink-0" />
      )}
      <time className="shrink-0 text-sm text-[var(--color-text-muted)]">
        {formatDate(date)}
      </time>
      <span className="truncate text-[var(--color-text-primary)] transition-colors hover:text-[var(--color-text-accent)]">
        {title}
      </span>
      <span className="ml-auto hidden shrink-0 gap-1.5 sm:flex">
        {tags.map((tag) => (
          <span
            key={tag}
            className="rounded bg-[var(--color-accent)]/10 px-1.5 py-0.5 text-xs text-[var(--color-text-accent)]"
          >
            {tag}
          </span>
        ))}
      </span>
    </Link>
  );
}
