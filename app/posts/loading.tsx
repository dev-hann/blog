import React from "react";
import PageContainer from "@/components/ui/PageContainer";
import Skeleton from "@/components/ui/Skeleton";

export default function PostsLoading() {
  return (
    <PageContainer>
      <Skeleton className="mb-8 h-8 w-24" />
      <div className="flex flex-col gap-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} data-testid="skeleton-card" className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-4">
            <Skeleton className="h-5 w-2/3" />
            <Skeleton className="mt-2 h-3 w-24" />
            <Skeleton className="mt-2 h-3 w-full" />
            <div className="mt-2 flex gap-2">
              <Skeleton className="h-5 w-12" variant="circle" />
              <Skeleton className="h-5 w-14" variant="circle" />
            </div>
          </div>
        ))}
      </div>
    </PageContainer>
  );
}
