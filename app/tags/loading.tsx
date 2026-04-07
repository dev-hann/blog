import PageContainer from "@/components/ui/PageContainer";

export default function TagsLoading() {
  return (
    <PageContainer>
      <div className="mb-8 h-8 w-20 animate-pulse rounded bg-[var(--color-bg-tertiary)]" />
      <div role="status" className="sr-only">Loading tags...</div>
      <div className="flex flex-wrap gap-3" data-testid="tags-skeleton">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-8 w-20 animate-pulse rounded-full bg-[var(--color-bg-tertiary)]" />
        ))}
      </div>
    </PageContainer>
  );
}
