import { getAllPosts } from "@/lib/posts";
import SearchBar from "@/components/search/SearchBar";
import { generateMetadata } from "@/lib/metadata";
import PageContainer from "@/components/ui/PageContainer";

export const metadata = generateMetadata({
  title: "Search",
  description: "Search blog posts",
  path: "/search",
});

export default function SearchPage() {
  const posts = getAllPosts();

  return (
    <PageContainer>
      <h1 id="search-heading" className="mb-8 text-2xl font-bold text-[var(--color-text-primary)]">
        Search
      </h1>
      <SearchBar posts={posts} />
    </PageContainer>
  );
}
