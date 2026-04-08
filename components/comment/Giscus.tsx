"use client";

import React from "react";
import GiscusComponent from "@giscus/react";

const REPO_ID = process.env.NEXT_PUBLIC_GISCUS_REPO_ID ?? "";
const CATEGORY_ID = process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID ?? "";

function Giscus() {
  const isConfigured = REPO_ID && CATEGORY_ID;

  return (
    <div data-comment-section="" data-testid="comment-section" className="mt-12 border-t border-[var(--color-border)] pt-8">
      <h2 className="mb-4 text-lg font-semibold text-[var(--color-text-primary)]">댓글</h2>
      {isConfigured ? (
        <GiscusComponent
          repo="hann/blog"
          repoId={REPO_ID}
          category="Comments"
          categoryId={CATEGORY_ID}
          mapping="pathname"
          strict="0"
          reactionsEnabled="1"
          emitMetadata="0"
          inputPosition="top"
          theme="dark"
          lang="ko"
          loading="lazy"
        />
      ) : (
        <p className="text-[var(--color-text-muted)]">
          댓글 기능이 활성화되지 않았습니다. 환경 변수 NEXT_PUBLIC_GISCUS_REPO_ID와 NEXT_PUBLIC_GISCUS_CATEGORY_ID를 설정하세요.
        </p>
      )}
    </div>
  );
}

export default React.memo(Giscus);
