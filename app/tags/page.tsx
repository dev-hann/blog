import React from "react";
import { getAllTags } from "@/lib/posts";
import TagBadge from "@/components/tag/TagBadge";
import { generateMetadata } from "@/lib/metadata";
import PageContainer from "@/components/ui/PageContainer";

export const metadata = generateMetadata({
  title: "Tags",
  description: "Browse posts by tag",
  path: "/tags",
});

export default function TagsPage() {
  const tags = getAllTags();
  const entries = Object.entries(tags).sort((a, b) => b[1] - a[1]);

  return (
    <PageContainer>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Tags",
            description: "Browse posts by tag",
          }),
        }}
      />
      <h1 id="tags-heading" className="mb-8 text-2xl font-bold text-[var(--color-text-primary)]">
        Tags
      </h1>
      <div className="flex flex-wrap gap-3">
        {entries.map(([tag, count]) => (
          <TagBadge key={tag} tag={tag} count={count} />
        ))}
      </div>
    </PageContainer>
  );
}
