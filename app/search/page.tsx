import { getAllPosts } from "@/lib/posts";
import SearchBar from "@/components/search/SearchBar";
import { generateMetadata } from "@/lib/metadata";

export const metadata = generateMetadata({
  title: "Search",
  description: "Search blog posts",
  path: "/search",
});

export default function SearchPage() {
  const posts = getAllPosts();

  return (
    <main className="min-h-screen bg-[var(--color-bg-primary)] px-4 py-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-8 text-2xl font-bold text-[var(--color-text-primary)]">
          Search
        </h1>
        <SearchBar posts={posts} />
      </div>
    </main>
  );
}
