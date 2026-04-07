import PageContainer from "@/components/ui/PageContainer";

export default function PostDetailLoading() {
  return (
    <PageContainer maxWidth="max-w-5xl">
      <div className="flex gap-8">
        <div className="min-w-0 max-w-3xl flex-1">
          <div role="status" className="sr-only">Loading post...</div>
          <header className="mb-8">
            <div className="h-8 w-3/4 animate-pulse rounded bg-[var(--color-bg-tertiary)]" />
            <div className="mt-3 flex items-center gap-4">
              <div className="h-4 w-24 animate-pulse rounded bg-[var(--color-bg-tertiary)]" />
              <div className="h-4 w-16 animate-pulse rounded bg-[var(--color-bg-tertiary)]" />
              <div className="flex gap-2">
                <div className="h-5 w-12 animate-pulse rounded bg-[var(--color-bg-tertiary)]" />
                <div className="h-5 w-14 animate-pulse rounded bg-[var(--color-bg-tertiary)]" />
              </div>
            </div>
          </header>
          <div data-testid="skeleton-body" className="flex flex-col gap-3">
            {[75, 90, 60, 85, 70, 95, 65, 80].map((w, i) => (
              <div key={i} className="h-4 animate-pulse rounded bg-[var(--color-bg-tertiary)]" style={{ width: `${w}%` }} />
            ))}
          </div>
        </div>
        <aside className="hidden w-56 shrink-0 lg:block">
          <div className="h-40 animate-pulse rounded bg-[var(--color-bg-tertiary)]" />
        </aside>
      </div>
    </PageContainer>
  );
}
