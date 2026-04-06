import { getAllTags } from "@/lib/posts";
import TagBadge from "@/components/tag/TagBadge";

export default function TagsPage() {
  const tags = getAllTags();

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">Tags</h1>
      <div className="flex flex-wrap gap-3">
        {Object.entries(tags).map(([tag, count]) => (
          <TagBadge key={tag} tag={tag} count={count} />
        ))}
      </div>
    </div>
  );
}
