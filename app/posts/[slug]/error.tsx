"use client";

import React from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";

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
        <Button variant="primary" onClick={reset}>
          Try again
        </Button>
        <Button variant="outline" asChild>
          <Link href="/posts">Back to posts</Link>
        </Button>
      </div>
    </div>
  );
}
