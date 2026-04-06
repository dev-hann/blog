import Link from "next/link";

interface TagBadgeProps {
  tag: string;
  count?: number;
}

export default function TagBadge({ tag, count }: TagBadgeProps) {
  return (
    <Link
      href={`/tags/${tag}`}
      className="inline-flex items-center gap-1 rounded bg-[var(--color-accent)]/10 px-1.5 py-0.5 font-mono text-xs text-[var(--color-text-accent)] transition-colors hover:bg-[var(--color-accent)] hover:text-white"
    >
      [{tag}]
      {count !== undefined && (
        <span className="text-[var(--color-text-muted)]">({count})</span>
      )}
    </Link>
  );
}
