import { getAllPosts } from "@/lib/posts";
import PostCard from "@/components/post/PostCard";

export default function PostsPage() {
  const posts = getAllPosts();

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">Posts</h1>
      <div className="flex flex-col gap-4">
        {posts.map((post) => (
          <PostCard key={post.slug} {...post} />
        ))}
      </div>
    </div>
  );
}
