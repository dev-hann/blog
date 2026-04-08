import { describe, it, expect } from "vitest";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { isValidDate } from "@/lib/posts";

describe("lib/posts - date validation integration", () => {
  it("getAllPosts returns only posts with valid dates", () => {
    const posts = getAllPosts();
    expect(posts.length).toBeGreaterThan(0);
    
    posts.forEach((post) => {
      expect(isValidDate(post.date)).toBe(true);
    });
  });

  it("getAllPosts excludes draft posts", () => {
    const posts = getAllPosts();
    posts.forEach((post) => {
      expect(post.draft).toBe(false);
    });
  });

  it("getAllPosts sorts posts by date descending", () => {
    const posts = getAllPosts();
    for (let i = 0; i < posts.length - 1; i++) {
      const currentDate = new Date(posts[i].date).getTime();
      const nextDate = new Date(posts[i + 1].date).getTime();
      expect(currentDate).toBeGreaterThanOrEqual(nextDate);
    }
  });

  it("getPostBySlug returns post with valid date", () => {
    const posts = getAllPosts();
    if (posts.length > 0) {
      const post = getPostBySlug(posts[0].slug);
      expect(isValidDate(post.date)).toBe(true);
    }
  });

  it("getPostBySlug throws for non-existent slug", () => {
    expect(() => getPostBySlug("non-existent-slug")).toThrow();
  });
});
