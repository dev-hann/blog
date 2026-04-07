"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import type { Post } from "@/types/post";
import PostCard from "@/components/post/PostCard";

interface PostListProps {
  posts: Post[];
  postsPerPage?: number;
}

export default function PostList({ posts, postsPerPage = 10 }: PostListProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pageFromUrl = Number(searchParams.get("page")) || 1;
  const [page, setPage] = useState(pageFromUrl);
  const totalPages = Math.ceil(posts.length / postsPerPage);

  const start = (page - 1) * postsPerPage;
  const currentPosts = posts.slice(start, start + postsPerPage);

  function goToPage(p: number) {
    setPage(p);
    const params = new URLSearchParams(searchParams.toString());
    if (p > 1) {
      params.set("page", String(p));
    } else {
      params.delete("page");
    }
    const qs = params.toString();
    router.replace(qs ? `?${qs}` : window.location.pathname, { scroll: false });
  }

  return (
    <div>
      {posts.length === 0 ? (
        <p className="text-[var(--color-text-muted)]">No posts found.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {currentPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
      {totalPages > 1 && (
        <nav aria-label="Post list pagination" className="mt-8 flex items-center justify-center gap-2">
          <button
            type="button"
            aria-label="Previous page"
            onClick={() => goToPage(Math.max(1, page - 1))}
            disabled={page === 1}
            className="rounded border border-[var(--color-border)] px-3 py-1 text-sm text-[var(--color-text-secondary)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] disabled:opacity-50 disabled:hover:border-[var(--color-border)] disabled:hover:text-[var(--color-text-secondary)]"
          >
            &larr; Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              type="button"
              aria-label={`Page ${p}`}
              aria-current={p === page ? "page" : undefined}
              onClick={() => goToPage(p)}
              className={`rounded px-3 py-1 text-sm ${
                p === page
                  ? "bg-[var(--color-accent)] text-[var(--color-bg-primary)]"
                  : "border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-accent)]"
              }`}
            >
              {p}
            </button>
          ))}
          <button
            type="button"
            aria-label="Next page"
            onClick={() => goToPage(Math.min(totalPages, page + 1))}
            disabled={page === totalPages}
            className="rounded border border-[var(--color-border)] px-3 py-1 text-sm text-[var(--color-text-secondary)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] disabled:opacity-50 disabled:hover:border-[var(--color-border)] disabled:hover:text-[var(--color-text-secondary)]"
          >
            Next &rarr;
          </button>
        </nav>
      )}
    </div>
  );
}
