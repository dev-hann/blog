import { describe, it, expect } from "vitest";
import { getAllPosts, getPostBySlug, getAllTags, getAdjacentPosts, extractHeadings } from "@/lib/posts";

describe("getAllPosts", () => {
  it("returns array of Post", () => {
    const posts = getAllPosts();
    expect(Array.isArray(posts)).toBe(true);
    expect(posts.length).toBeGreaterThan(0);
    for (const post of posts) {
      expect(post).toHaveProperty("slug");
      expect(post).toHaveProperty("title");
      expect(post).toHaveProperty("date");
      expect(post).toHaveProperty("tags");
      expect(post).toHaveProperty("summary");
    }
  });

  it("sorts by date descending", () => {
    const posts = getAllPosts();
    for (let i = 1; i < posts.length; i++) {
      const prev = new Date(posts[i - 1].date).getTime();
      const curr = new Date(posts[i].date).getTime();
      expect(prev).toBeGreaterThanOrEqual(curr);
    }
  });

  it("excludes draft posts", () => {
    const posts = getAllPosts();
    for (const post of posts) {
      expect(post.draft).toBeFalsy();
    }
  });
});

describe("getPostBySlug", () => {
  it("returns PostDetail for valid slug", () => {
    const post = getPostBySlug("nextjs-blog-guide");
    expect(post.slug).toBe("nextjs-blog-guide");
    expect(post.title).toBe("Next.js 16으로 블로그 만들기");
    expect(post.content).toBeTruthy();
    expect(post.tags).toContain("nextjs");
  });

  it("throws for non-existent slug", () => {
    expect(() => getPostBySlug("non-existent-post")).toThrow();
  });
});

describe("getAllTags", () => {
  it("returns tag counts", () => {
    const tags = getAllTags();
    expect(tags).toHaveProperty("nextjs");
    expect(tags).toHaveProperty("typescript");
    expect(tags.nextjs).toBeGreaterThanOrEqual(1);
    expect(tags.typescript).toBeGreaterThanOrEqual(1);
  });

  it("excludes tags from draft posts", () => {
    const tags = getAllTags();
    expect(tags).not.toHaveProperty("tailwindcss");
  });
});

describe("getAdjacentPosts", () => {
  it("returns prev and next", () => {
    const posts = getAllPosts();
    const middleSlug = posts[1].slug;
    const { prev, next } = getAdjacentPosts(middleSlug);
    expect(prev).not.toBeNull();
    expect(next).not.toBeNull();
  });

  it("returns null prev for first post", () => {
    const posts = getAllPosts();
    const { prev } = getAdjacentPosts(posts[0].slug);
    expect(prev).toBeNull();
  });

  it("returns null next for last post", () => {
    const posts = getAllPosts();
    const { next } = getAdjacentPosts(posts[posts.length - 1].slug);
    expect(next).toBeNull();
  });
});

describe("extractHeadings", () => {
  it("extracts h2 and h3 headings", () => {
    const content = "## Intro\n\nSome text\n### Details\n\nMore text\n## Conclusion";
    const headings = extractHeadings(content);
    expect(headings).toHaveLength(3);
    expect(headings[0]).toEqual({ id: "intro", text: "Intro", level: 2 });
    expect(headings[1]).toEqual({ id: "details", text: "Details", level: 3 });
    expect(headings[2]).toEqual({ id: "conclusion", text: "Conclusion", level: 2 });
  });

  it("returns empty array for content without headings", () => {
    const content = "Just a paragraph\n\nAnother paragraph";
    const headings = extractHeadings(content);
    expect(headings).toEqual([]);
  });

  it("generates correct ids from Korean and special chars", () => {
    const content = "## 한글 제목\n## Hello World\n## React & Next.js";
    const headings = extractHeadings(content);
    expect(headings[0].id).toBe("한글-제목");
    expect(headings[1].id).toBe("hello-world");
    expect(headings[2].id).toBe("react-nextjs");
  });
});
