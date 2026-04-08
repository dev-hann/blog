import React, { Suspense } from "react";
import { getAllPosts } from "@/lib/posts";
import PostList from "@/components/post/PostList";
import PageContainer from "@/components/ui/PageContainer";
import PageHeading from "@/components/ui/PageHeading";
import { generateMetadata } from "@/lib/metadata";
import { generateJsonLd } from "@/lib/structured-data";

export const metadata = generateMetadata({
  title: "Posts",
  description: "All blog posts",
  path: "/posts",
});

export default function PostsPage() {
  const posts = getAllPosts();

  return (
    <PageContainer>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: generateJsonLd({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Posts",
            description: "All blog posts",
          }),
        }}
      />
      <PageHeading id="posts-heading">Posts</PageHeading>
      <Suspense>
        <PostList posts={posts} />
      </Suspense>
    </PageContainer>
  );
}
