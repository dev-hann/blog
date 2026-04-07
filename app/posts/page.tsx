import { Suspense } from "react";
import { getAllPosts } from "@/lib/posts";
import PostList from "@/components/post/PostList";
import PageContainer from "@/components/ui/PageContainer";
import { generateMetadata } from "@/lib/metadata";

export const metadata = generateMetadata({
  title: "Posts",
  description: "All blog posts",
  path: "/posts",
});

export default function PostsPage() {
  const posts = getAllPosts();

  return (
    <PageContainer>
      <h1 id="posts-heading" className="mb-8 text-2xl font-bold text-[var(--color-text-primary)]">
        Posts
      </h1>
      <Suspense>
        <PostList posts={posts} />
      </Suspense>
    </PageContainer>
  );
}
