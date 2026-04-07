import { getAllPosts, getAllTags, getPostBySlug } from "@/lib/posts";
import Terminal from "@/components/terminal/Terminal";
import { renderMDXToHTML } from "@/lib/mdx-html";

export default async function Home() {
  const posts = getAllPosts();
  const tags = getAllTags();

  const postHtml: Record<string, string> = {};
  for (const post of posts) {
    try {
      const detail = getPostBySlug(post.slug);
      postHtml[post.slug] = await renderMDXToHTML(detail.content);
    } catch {
      postHtml[post.slug] = "";
    }
  }

  return <Terminal posts={posts} tags={tags} postHtml={postHtml} />;
}
