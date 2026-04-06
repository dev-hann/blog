import { getAllPosts } from "@/lib/posts";
import SearchBar from "@/components/search/SearchBar";

export default function SearchPage() {
  const posts = getAllPosts();

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">
        검색
      </h1>
      <SearchBar posts={posts} />
    </div>
  );
}
