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
            <div className="h-4 animate-pulse rounded bg-[var(--color-bg-tertiary)] w-3/4" />
            <div className="h-4 animate-pulse rounded bg-[var(--color-bg-tertiary)] w-[90%]" />
            <div className="h-4 animate-pulse rounded bg-[var(--color-bg-tertiary)] w-3/5" />
            <div className="h-4 animate-pulse rounded bg-[var(--color-bg-tertiary)] w-[85%]" />
            <div className="h-4 animate-pulse rounded bg-[var(--color-bg-tertiary)] w-7/10" />
            <div className="h-4 animate-pulse rounded bg-[var(--color-bg-tertiary)] w-[95%]" />
            <div className="h-4 animate-pulse rounded bg-[var(--color-bg-tertiary)] w-[65%]" />
            <div className="h-4 animate-pulse rounded bg-[var(--color-bg-tertiary)] w-4/5" />
          </div>
        </div>
        <aside className="hidden w-56 shrink-0 lg:block">
          <div className="h-40 animate-pulse rounded bg-[var(--color-bg-tertiary)]" />
        </aside>
      </div>
    </PageContainer>
  );
}
