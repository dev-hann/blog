import { getAllPosts } from "@/lib/posts";
import type { Post } from "@/types/post";

export type SearchIndexEntry = Pick<Post, "slug" | "title" | "summary" | "tags">;

export async function getSearchIndex(): Promise<SearchIndexEntry[]> {
  const posts = getAllPosts();
  return posts.map(({ slug, title, summary, tags }) => ({
    slug,
    title,
    summary,
    tags,
  }));
}
