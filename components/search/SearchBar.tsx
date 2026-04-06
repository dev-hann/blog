"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import PostListItem from "@/components/post/PostListItem";
import type { Post } from "@/types/post";

interface SearchBarProps {
  posts: Post[];
}

export default function SearchBar({ posts }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setQuery(value);
      setIsSearching(true);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        setDebouncedQuery(value);
        setIsSearching(false);
      }, 300);
    },
    []
  );

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const filtered = debouncedQuery.trim()
    ? posts.filter((post) => {
        const q = debouncedQuery.toLowerCase();
        return (
          post.title.toLowerCase().includes(q) ||
          post.summary.toLowerCase().includes(q) ||
          post.tags.some((tag) => tag.toLowerCase().includes(q))
        );
      })
    : [];

  const hasQuery = debouncedQuery.trim().length > 0;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2 font-mono">
        <span className="shrink-0 text-sm text-[var(--color-prompt)]">$</span>
        <span className="shrink-0 text-sm text-[var(--color-prompt)]">grep -r</span>
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="&quot;검색어&quot; ~/posts"
          className="flex-1 border-none bg-transparent font-mono text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none"
        />
      </div>

      {isSearching && hasQuery && (
        <p className="text-sm text-[var(--color-text-muted)]">...</p>
      )}

      {!isSearching && hasQuery && filtered.length === 0 && (
        <p className="font-mono text-sm text-[var(--color-text-muted)]">
          0 results found
        </p>
      )}

      {!isSearching && hasQuery && filtered.length > 0 && (
        <>
          <p className="font-mono text-sm text-[var(--color-text-secondary)]">
            {filtered.length} results found:
          </p>
          <div className="flex flex-col">
            {filtered.map((post) => (
              <PostListItem key={post.slug} {...post} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
