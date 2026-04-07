"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import type { Post } from "@/types/post";
import { formatDate } from "@/lib/format";

interface SearchBarProps {
  posts: Post[];
}

export default function SearchBar({ posts }: SearchBarProps) {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    if (!query.trim()) return posts;
    const q = query.toLowerCase();
    return posts.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.summary.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
    );
  }, [query, posts]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search posts..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-secondary)] px-4 py-3 text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-accent)] focus:outline-none"
      />
      <div className="mt-4 flex flex-col gap-3">
        {results.length === 0 && query.trim() ? (
          <p className="text-[var(--color-text-muted)]">No results found for &ldquo;{query}&rdquo;</p>
        ) : (
          results.map((post) => (
            <Link
              key={post.slug}
              href={`/posts/${post.slug}`}
              className="block rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-4 transition-colors hover:border-[var(--color-accent)]"
            >
              <h3 className="font-semibold text-[var(--color-text-primary)]">
                {post.title}
              </h3>
              <div className="mt-1 flex items-center gap-3 text-sm text-[var(--color-text-muted)]">
                <time>{formatDate(post.date)}</time>
                <div className="flex gap-2">
                  {post.tags.map((tag) => (
                    <span key={tag} className="text-xs text-[var(--color-text-accent)]">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
              {post.summary && (
                <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
                  {post.summary}
                </p>
              )}
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
