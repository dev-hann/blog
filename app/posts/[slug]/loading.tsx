import React from "react";
import PageContainer from "@/components/ui/PageContainer";
import Skeleton from "@/components/ui/Skeleton";

export default function PostDetailLoading() {
  return (
    <PageContainer maxWidth="max-w-5xl">
      <div className="flex gap-8">
        <div className="min-w-0 max-w-3xl flex-1">
          <header className="mb-8">
            <Skeleton className="h-8 w-3/4" />
            <div className="mt-3 flex items-center gap-4">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-16" />
              <div className="flex gap-2">
                <Skeleton className="h-5 w-12" variant="circle" />
                <Skeleton className="h-5 w-14" variant="circle" />
              </div>
            </div>
          </header>
          <div data-testid="skeleton-body" className="flex flex-col gap-3">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-[90%]" />
            <Skeleton className="h-4 w-3/5" />
            <Skeleton className="h-4 w-[85%]" />
            <Skeleton className="h-4 w-7/10" />
            <Skeleton className="h-4 w-[95%]" />
            <Skeleton className="h-4 w-[65%]" />
            <Skeleton className="h-4 w-4/5" />
          </div>
        </div>
        <aside className="hidden w-56 shrink-0 lg:block">
          <Skeleton className="h-40" />
        </aside>
      </div>
    </PageContainer>
  );
}
