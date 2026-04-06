import { notFound } from "next/navigation";
import { getAllTags, getAllPosts } from "@/lib/posts";
import PostListItem from "@/components/post/PostListItem";

export function generateStaticParams() {
  const tags = getAllTags();
  return Object.keys(tags).map((tag) => ({ tag }));
}

export default async function TagDetailPage({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params;

  const tags = getAllTags();
  if (!tags[tag]) {
    notFound();
    return null;
  }

  const posts = getAllPosts().filter((post) => post.tags.includes(tag));

  return (
    <div className="flex flex-col gap-6">
      <p className="font-mono text-[var(--color-prompt)]">
        $ <span className="text-[var(--color-text-primary)]">grep -r &quot;{tag}&quot; ~/posts</span>
      </p>
      <div className="flex flex-col">
        {posts.map((post) => (
          <PostListItem key={post.slug} {...post} />
        ))}
      </div>
    </div>
  );
}
