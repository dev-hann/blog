import { getAllTags } from "@/lib/posts";
import TagBadge from "@/components/tag/TagBadge";

export default function TagsPage() {
  const tags = getAllTags();

  return (
    <div className="flex flex-col gap-6">
      <p className="font-mono text-[var(--color-prompt)]">
        $ <span className="text-[var(--color-text-primary)]">tags</span>
      </p>
      <div className="flex flex-wrap gap-3">
        {Object.entries(tags).map(([tag, count]) => (
          <TagBadge key={tag} tag={tag} count={count} />
        ))}
      </div>
    </div>
  );
}
