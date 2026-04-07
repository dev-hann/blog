import Link from "next/link";

interface TagBadgeProps {
  tag: string;
  count?: number;
}

export default function TagBadge({ tag, count }: TagBadgeProps) {
  return (
    <Link
      href={`/tags/${tag}`}
      className="inline-flex items-center gap-1 rounded bg-[var(--color-bg-tertiary)] px-2.5 py-1 text-sm text-[var(--color-text-accent)] transition-colors hover:bg-[var(--color-bg-hover)]"
    >
      {tag}
      {count !== undefined && (
        <span className="text-xs text-[var(--color-text-muted)]">({count})</span>
      )}
    </Link>
  );
}
