"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import PostCard from "@/components/post/PostCard";
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
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="검색어를 입력하세요..."
          className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-secondary)] px-4 py-3 text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-accent)] focus:outline-none"
        />
      </div>

      {isSearching && hasQuery && (
        <p className="text-sm text-[var(--color-text-muted)]">검색 중...</p>
      )}

      {!isSearching && hasQuery && filtered.length === 0 && (
        <p className="text-sm text-[var(--color-text-muted)]">
          &ldquo;{debouncedQuery}&rdquo; 검색 결과가 없습니다.
        </p>
      )}

      {!isSearching && hasQuery && filtered.length > 0 && (
        <>
          <p className="text-sm text-[var(--color-text-secondary)]">
            &ldquo;{debouncedQuery}&rdquo; 검색 결과 ({filtered.length}건)
          </p>
          <div className="flex flex-col gap-4">
            {filtered.map((post) => (
              <PostCard key={post.slug} {...post} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
