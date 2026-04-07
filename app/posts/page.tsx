import { getAllPosts } from "@/lib/posts";
import PostCard from "@/components/post/PostCard";
import { generateMetadata } from "@/lib/metadata";

export const metadata = generateMetadata({
  title: "Posts",
  description: "All blog posts",
  path: "/posts",
});

export default function PostsPage() {
  const posts = getAllPosts();

  return (
    <div className="bg-[var(--color-bg-primary)] px-4 py-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-8 text-2xl font-bold text-[var(--color-text-primary)]">
          Posts
        </h1>
        <div className="flex flex-col gap-4">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}
