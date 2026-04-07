import { getAllPosts, getAllTags, getPostBySlug } from "@/lib/posts";
import Terminal from "@/components/terminal/Terminal";
import NoScriptFallback from "@/components/ui/NoScriptFallback";
import { renderMDXToHTML } from "@/lib/mdx-html";
import { generateMetadata } from "@/lib/metadata";
import type { PostHtmlMap } from "@/types/post";

export const metadata = generateMetadata({
  title: "Blog",
  description: "개인 기술 블로그 — hann",
  path: "/",
});

export default async function Home() {
  const posts = getAllPosts();
  const tags = getAllTags();

  const postHtml: PostHtmlMap = {};
  for (const post of posts) {
    try {
      const detail = getPostBySlug(post.slug);
      postHtml[post.slug] = await renderMDXToHTML(detail.content);
    } catch {
      postHtml[post.slug] = "";
    }
  }

  return (
    <>
      <Terminal posts={posts} tags={tags} postHtml={postHtml} />
      <NoScriptFallback />
    </>
  );
}
