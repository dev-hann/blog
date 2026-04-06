import { getAllPosts, getAllTags } from "@/lib/posts";
import Terminal from "@/components/terminal/Terminal";

export default function Home() {
  const posts = getAllPosts();
  const tags = getAllTags();

  return <Terminal posts={posts} tags={tags} />;
}
