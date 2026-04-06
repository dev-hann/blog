import { describe, it, expect, vi } from "vitest";
import sitemap from "@/app/sitemap";

vi.mock("@/lib/posts", () => ({
  getAllPosts: () => [
    {
      slug: "first-post",
      title: "첫 번째 포스트",
      date: "2026-04-06",
      tags: ["react", "typescript"],
      summary: "요약",
      draft: false,
    },
    {
      slug: "second-post",
      title: "두 번째 포스트",
      date: "2026-04-05",
      tags: ["nextjs"],
      summary: "요약",
      draft: false,
    },
  ],
  getAllTags: () => ({
    react: 1,
    typescript: 1,
    nextjs: 1,
  }),
}));

describe("Sitemap", () => {
  it("returns array of entries", () => {
    const result = sitemap();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });

  it("contains all page URLs", () => {
    const result = sitemap();
    const urls = result.map((entry) => entry.url);
    expect(urls.some((u) => u.includes("/posts/first-post"))).toBe(true);
    expect(urls.some((u) => u.includes("/posts/second-post"))).toBe(true);
    expect(urls.some((u) => u.includes("/tags/react"))).toBe(true);
    expect(urls.some((u) => u.includes("/tags/typescript"))).toBe(true);
    expect(urls.some((u) => u.includes("/tags/nextjs"))).toBe(true);
  });

  it("includes static pages", () => {
    const result = sitemap();
    const urls = result.map((entry) => entry.url);
    expect(urls.some((u) => u.endsWith("/about"))).toBe(true);
    expect(urls.some((u) => u.endsWith("/projects"))).toBe(true);
    expect(urls.some((u) => u.endsWith("/posts"))).toBe(true);
    expect(urls.some((u) => u.endsWith("/tags"))).toBe(true);
  });
});
