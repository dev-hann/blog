import React from "react";
import { getAllPosts } from "@/lib/posts";
import SearchBar from "@/components/search/SearchBar";
import { generateMetadata } from "@/lib/metadata";
import PageContainer from "@/components/ui/PageContainer";
import PageHeading from "@/components/ui/PageHeading";

export const metadata = generateMetadata({
  title: "Search",
  description: "Search blog posts",
  path: "/search",
});

export default function SearchPage() {
  const posts = getAllPosts();

  return (
    <PageContainer>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Search",
            description: "Search blog posts",
          }),
        }}
      />
      <PageHeading id="search-heading">Search</PageHeading>
      <SearchBar posts={posts} />
    </PageContainer>
  );
}
