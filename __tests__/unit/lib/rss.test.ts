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

  it("escapes XML special characters in tags", () => {
    const posts = getAllPosts();
    const post = {
      ...posts[0],
      slug: "test-post",
      title: "Test & <Post>",
      summary: "A & B < C > D",
      tags: ["react&next", "ui/ux<design>", "c++"],
    };
    const xml = generateRSS([post]);
    expect(xml).toContain("<category>react&amp;next</category>");
    expect(xml).toContain("<category>ui/ux&lt;design&gt;</category>");
    expect(xml).not.toContain("<category>react&next</category>");
    expect(xml).not.toContain("<category>ui/ux<design></category>");
  });

  it("includes language from SITE_CONFIG", () => {
    const posts = getAllPosts();
    const xml = generateRSS(posts);
    expect(xml).toContain("<language>ko</language>");
  });
});
