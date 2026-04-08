import React from "react";
import PageContainer from "@/components/ui/PageContainer";
import Skeleton from "@/components/ui/Skeleton";

export default function TagsLoading() {
  return (
    <PageContainer>
      <Skeleton className="mb-8 h-8 w-20" />
      <div className="flex flex-wrap gap-3" data-testid="tags-skeleton">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-8 w-20" variant="circle" />
        ))}
      </div>
    </PageContainer>
  );
}
