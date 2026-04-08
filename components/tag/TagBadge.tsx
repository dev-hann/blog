import React from "react";
import Link from "next/link";

interface TagBadgeProps {
  tag: string;
  count?: number;
  asLink?: boolean;
}

function TagBadge({ tag, count, asLink = true }: TagBadgeProps) {
  const ariaLabel = count !== undefined ? `Tag: ${tag}, ${count} post${count !== 1 ? "s" : ""}` : `Tag: ${tag}`;
  const className = "inline-flex items-center gap-1 rounded bg-[var(--color-bg-tertiary)] px-2.5 py-1 text-sm text-[var(--color-text-accent)] transition-colors hover:bg-[var(--color-bg-hover)]";

  const content = (
    <>
      {tag}
      {count !== undefined && (
        <span className="text-xs text-[var(--color-text-muted)]">({count})</span>
      )}
    </>
  );

  if (!asLink) {
    return (
      <span aria-label={ariaLabel} className={className}>
        {content}
      </span>
    );
  }

  return (
    <Link href={`/tags/${tag}`} aria-label={ariaLabel} className={className}>
      {content}
    </Link>
  );
}

export default React.memo(TagBadge, (prevProps, nextProps) => {
  return prevProps.tag === nextProps.tag &&
         prevProps.count === nextProps.count &&
         prevProps.asLink === nextProps.asLink;
});
