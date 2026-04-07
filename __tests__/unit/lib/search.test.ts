import { describe, it, expect, vi } from "vitest";

vi.mock("@/lib/posts", () => ({
  getAllPosts: () => [
    { slug: "post-1", title: "Next.js Guide", date: "2026-04-06", tags: ["nextjs"], summary: "Learn Next.js" },
    { slug: "post-2", title: "React Hooks", date: "2026-04-05", tags: ["react"], summary: "React hooks guide" },
  ],
}));

describe("getSearchIndex", () => {
  it("returns search index with slug, title, summary, tags", async () => {
    const { getSearchIndex } = await import("@/lib/search");
    const index = await getSearchIndex();
    expect(index).toHaveLength(2);
    expect(index[0]).toHaveProperty("slug");
    expect(index[0]).toHaveProperty("title");
    expect(index[0]).toHaveProperty("summary");
    expect(index[0]).toHaveProperty("tags");
    expect(index[0]).not.toHaveProperty("date");
  });

  it("includes all non-draft posts", async () => {
    const { getSearchIndex } = await import("@/lib/search");
    const index = await getSearchIndex();
    expect(index.some((e) => e.slug === "post-1")).toBe(true);
    expect(index.some((e) => e.slug === "post-2")).toBe(true);
  });
});
