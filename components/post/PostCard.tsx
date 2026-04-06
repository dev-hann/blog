import Link from "next/link";
import type { Post } from "@/types/post";

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
}

export default function PostCard({ slug, title, date, summary, tags }: Post) {
  return (
    <Link href={`/posts/${slug}`}>
      <article className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-5 transition-colors hover:border-[var(--color-accent)]">
        <time className="text-sm text-[var(--color-text-muted)]">
          {formatDate(date)}
        </time>
        <h2 className="mt-2 text-lg font-semibold text-[var(--color-text-primary)]">
          {title}
        </h2>
        <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
          {summary}
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-[var(--color-accent)]/10 px-2 py-0.5 text-xs font-medium text-[var(--color-accent)]"
            >
              {tag}
            </span>
          ))}
        </div>
      </article>
    </Link>
  );
}
