"use client";

import Link from "next/link";

export default function PostDetailError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div role="alert" className="flex flex-col items-center justify-center bg-[var(--color-bg-primary)] px-4 py-24">
      <h1 className="text-4xl font-bold text-[var(--color-text-primary)]">Failed to load post</h1>
      <p className="mt-4 text-[var(--color-text-muted)]">
        An error occurred while rendering this post.
      </p>
      <div className="mt-6 flex gap-4">
        <button
          type="button"
          onClick={reset}
          className="rounded bg-[var(--color-accent)] px-6 py-2 text-sm text-[var(--color-bg-primary)] transition-colors hover:bg-[var(--color-accent-hover)]"
        >
          Try again
        </button>
        <Link
          href="/posts"
          className="rounded border border-[var(--color-border)] px-6 py-2 text-sm text-[var(--color-text-muted)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-text-accent)]"
        >
          Back to posts
        </Link>
      </div>
    </div>
  );
}
