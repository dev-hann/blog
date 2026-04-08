"use client";

import React, { useState, useMemo, useEffect, useRef, useCallback } from "react";
import type { Post } from "@/types/post";
import PostCard from "@/components/post/PostCard";

interface SearchBarProps {
  posts: Post[];
}

function SearchBar({ posts }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null);

  const handleQueryChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  }, []);

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

  const isDebouncing = query.trim().length > 0 && query !== debouncedQuery;

  return (
    <div role="search">
      <input
        type="text"
        role="searchbox"
        aria-label="Search posts"
        placeholder="Search posts..."
        value={query}
        onChange={handleQueryChange}
        className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-secondary)] px-4 py-3 text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-accent)] focus:outline-none"
      />
      {isDebouncing && (
        <p data-testid="search-loading" className="mt-2 text-sm text-[var(--color-text-muted)]" aria-live="polite">
          Searching...
        </p>
      )}
      {debouncedQuery.trim() && !isDebouncing && (
        <p className="mt-3 text-sm text-[var(--color-text-muted)]" aria-live="polite">
          {results.length} {results.length === 1 ? "result" : "results"} for &ldquo;{debouncedQuery}&rdquo;
        </p>
      )}
      <div className="mt-4 flex flex-col gap-3" aria-live="polite" aria-atomic="true">
        {results.length === 0 && debouncedQuery.trim() ? (
          <p className="text-[var(--color-text-muted)]">No results found for &ldquo;{debouncedQuery}&rdquo;</p>
        ) : (
          results.map((post) => (
            <PostCard key={post.slug} post={post} highlightQuery={debouncedQuery} />
          ))
        )}
      </div>
    </div>
  );
}

export default React.memo(SearchBar, (prevProps, nextProps) => {
  return prevProps.posts === nextProps.posts;
});
