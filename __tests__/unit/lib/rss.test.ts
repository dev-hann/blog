import { describe, it, expect } from "vitest";
import { generateRSS } from "@/lib/rss";
import { getAllPosts } from "@/lib/posts";

describe("generateRSS", () => {
  it("generates valid RSS XML", () => {
    const posts = getAllPosts();
    const xml = generateRSS(posts);
    expect(xml).toContain("<?xml");
    expect(xml).toContain("<rss");
    expect(xml).toContain("<channel>");
    expect(xml).toContain("</channel>");
    expect(xml).toContain("</rss>");
  });

  it("includes all posts", () => {
    const posts = getAllPosts();
    const xml = generateRSS(posts);
    for (const post of posts) {
      expect(xml).toContain(post.title);
      expect(xml).toContain(post.slug);
    }
  });

  it("limits to 20 posts", () => {
    const posts = getAllPosts();
    const manyPosts = [...Array(30)].map((_, i) => ({
      ...posts[0],
      slug: `post-${i}`,
      title: `Post ${i}`,
    }));
    const xml = generateRSS(manyPosts);
    const count = (xml.match(/<item>/g) || []).length;
    expect(count).toBeLessThanOrEqual(20);
  });
});
