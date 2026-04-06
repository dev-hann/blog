import { getAllPosts } from "@/lib/posts";
import SearchBar from "@/components/search/SearchBar";

export default function SearchPage() {
  const posts = getAllPosts();

  return (
    <div className="flex flex-col gap-6">
      <SearchBar posts={posts} />
    </div>
  );
}
