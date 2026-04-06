import { describe, it, expect } from "vitest";
import { getAllPosts, getPostBySlug, getAllTags, getAdjacentPosts } from "@/lib/posts";

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
