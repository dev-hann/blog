import { getAllPosts, getAllTags, getPostBySlug } from "@/lib/posts";
import Terminal from "@/components/terminal/Terminal";
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
      <noscript data-noscript="true" dangerouslySetInnerHTML={{ __html: `<div style="padding:2rem;color:#d4d4d8;background:#0a0a0a;min-height:100vh"><h2 style="font-size:1.25rem;font-weight:600;margin-bottom:1rem">Blog</h2><nav><a href="/posts" style="display:block;margin:.5rem 0;color:#4ade80">Posts</a><a href="/tags" style="display:block;margin:.5rem 0;color:#4ade80">Tags</a><a href="/projects" style="display:block;margin:.5rem 0;color:#4ade80">Projects</a><a href="/about" style="display:block;margin:.5rem 0;color:#4ade80">About</a><a href="/search" style="display:block;margin:.5rem 0;color:#4ade80">Search</a></nav></div>` }} />
    </>
  );
}
