"use client";

import GiscusComponent from "@giscus/react";

export default function Giscus() {
  return (
    <div data-comment-section="" data-testid="comment-section" className="mt-12 border-t border-[var(--color-border)] pt-8">
      <h2 className="mb-4 text-lg font-semibold text-[var(--color-text-primary)]">댓글</h2>
      <GiscusComponent
        repo="hann/blog"
        repoId=""
        category="Comments"
        categoryId=""
        mapping="pathname"
        strict="0"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme="dark"
        lang="ko"
        loading="lazy"
      />
    </div>
  );
}
