import PageContainer from "@/components/ui/PageContainer";

export default function PostsLoading() {
  return (
    <PageContainer>
      <div className="mb-8 h-8 w-24 animate-pulse rounded bg-[var(--color-bg-tertiary)]" />
      <div role="status" className="sr-only">Loading posts...</div>
      <div className="flex flex-col gap-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} data-testid="skeleton-card" className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-4">
            <div className="h-5 w-2/3 animate-pulse rounded bg-[var(--color-bg-tertiary)]" />
            <div className="mt-2 h-3 w-24 animate-pulse rounded bg-[var(--color-bg-tertiary)]" />
            <div className="mt-2 h-3 w-full animate-pulse rounded bg-[var(--color-bg-tertiary)]" />
            <div className="mt-2 flex gap-2">
              <div className="h-5 w-12 animate-pulse rounded bg-[var(--color-bg-tertiary)]" />
              <div className="h-5 w-14 animate-pulse rounded bg-[var(--color-bg-tertiary)]" />
            </div>
          </div>
        ))}
      </div>
    </PageContainer>
  );
}
