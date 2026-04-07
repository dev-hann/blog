"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import type { Post } from "@/types/post";
import PostCard from "@/components/post/PostCard";

interface SearchBarProps {
  posts: Post[];
}

export default function SearchBar({ posts }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setDebouncedQuery(query), 300);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [query]);

  const results = useMemo(() => {
    if (!debouncedQuery.trim()) return posts;
    const q = debouncedQuery.toLowerCase();
    return posts.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.summary.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
    );
  }, [debouncedQuery, posts]);

  return (
    <div>
      <input
        type="text"
        role="searchbox"
        aria-label="Search posts"
        placeholder="Search posts..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-secondary)] px-4 py-3 text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-accent)] focus:outline-none"
      />
      <div className="mt-4 flex flex-col gap-3">
        {results.length === 0 && debouncedQuery.trim() ? (
          <p className="text-[var(--color-text-muted)]">No results found for &ldquo;{debouncedQuery}&rdquo;</p>
        ) : (
          results.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))
        )}
      </div>
    </div>
  );
}
