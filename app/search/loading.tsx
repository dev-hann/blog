import React from "react";
import PageContainer from "@/components/ui/PageContainer";
import Skeleton from "@/components/ui/Skeleton";

export default function SearchLoading() {
  return (
    <PageContainer>
      <Skeleton className="mb-8 h-8 w-20" />
      <div className="h-12 w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-secondary)]">
        <Skeleton className="h-full w-full rounded-lg" />
      </div>
      <div className="mt-4 flex flex-col gap-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} data-testid="skeleton-card" className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-4">
            <Skeleton className="h-5 w-2/3" />
            <Skeleton className="mt-2 h-3 w-full" />
          </div>
        ))}
      </div>
    </PageContainer>
  );
}
