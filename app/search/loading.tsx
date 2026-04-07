import PageContainer from "@/components/ui/PageContainer";

export default function SearchLoading() {
  return (
    <PageContainer>
      <div className="mb-8 h-8 w-20 animate-pulse rounded bg-[var(--color-bg-tertiary)]" />
      <div role="status" className="sr-only">Loading search...</div>
      <div className="h-12 w-full animate-pulse rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-secondary)]" />
      <div className="mt-4 flex flex-col gap-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} data-testid="skeleton-card" className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-4">
            <div className="h-5 w-2/3 animate-pulse rounded bg-[var(--color-bg-tertiary)]" />
            <div className="mt-2 h-3 w-full animate-pulse rounded bg-[var(--color-bg-tertiary)]" />
          </div>
        ))}
      </div>
    </PageContainer>
  );
}
