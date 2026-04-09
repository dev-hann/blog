import React from "react";
import Link from "next/link";

import type { Post } from "@/types/post";

interface PostNavigationProps {
  previous: Post | null;
  next: Post | null;
}

function PostNavigation({ previous, next }: PostNavigationProps) {
  if (!previous && !next) {
    return null;
  }

  return (
    <nav className="mt-8 flex flex-col gap-4 border-t border-[var(--color-border)] pt-8 sm:flex-row sm:justify-between" aria-label="Post navigation">
      {previous && (
        <Link
          href={`/posts/${previous.slug}`}
          className="group flex flex-col gap-1 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-4 transition-colors hover:border-[var(--color-accent)] sm:w-1/2"
          aria-label={`Previous post: ${previous.title}`}
        >
          <span className="text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider">
            ← Previous
          </span>
          <span className="font-medium text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)]">
            {previous.title}
          </span>
        </Link>
      )}
      {next && (
        <Link
          href={`/posts/${next.slug}`}
          className={`group flex flex-col gap-1 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-4 transition-colors hover:border-[var(--color-accent)] sm:w-1/2 ${previous ? "ml-auto" : ""}`}
          aria-label={`Next post: ${next.title}`}
        >
          <span className="text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider text-right">
            Next →
          </span>
          <span className="font-medium text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] text-right">
            {next.title}
          </span>
        </Link>
      )}
    </nav>
  );
}

export default PostNavigation;
