import { notFound } from "next/navigation";
import { getAllTags, getAllPosts } from "@/lib/posts";
import PostCard from "@/components/post/PostCard";

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
      <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">
        {tag}
      </h1>
      <div className="flex flex-col gap-4">
        {posts.map((post) => (
          <PostCard key={post.slug} {...post} />
        ))}
      </div>
    </div>
  );
}
