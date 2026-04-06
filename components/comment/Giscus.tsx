"use client";

import GiscusComponent from "@giscus/react";

export default function Giscus() {
  return (
    <section data-comment-section className="mt-12 border-t border-[var(--color-border)] pt-8">
      <h2 className="mb-6 text-xl font-semibold text-[var(--color-text-primary)]">
        댓글
      </h2>
      <GiscusComponent
        repo="owner/repo"
        repoId="PLACEHOLDER_REPO_ID"
        category="Comments"
        categoryId="PLACEHOLDER_CATEGORY_ID"
        mapping="pathname"
        strict="0"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme="dark"
        lang="ko"
        loading="lazy"
      />
    </section>
  );
}
