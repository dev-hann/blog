import { describe, it, expect } from "vitest";

describe("Sitemap", () => {
  it("includes all static pages", async () => {
    const { default: sitemap } = await import("@/app/sitemap");
    const entries = await sitemap();
    const urls = entries.map((e: { url: string }) => e.url);
    expect(urls).toContain("https://blog.dev/posts");
    expect(urls).toContain("https://blog.dev/about");
    expect(urls).toContain("https://blog.dev/projects");
    expect(urls).toContain("https://blog.dev/search");
    expect(urls).toContain("https://blog.dev/tags");
  });

  it("includes dynamic post pages", async () => {
    const { default: sitemap } = await import("@/app/sitemap");
    const entries = await sitemap();
    const urls = entries.map((e: { url: string }) => e.url);
    expect(urls.some((u: string) => u.includes("/posts/"))).toBe(true);
  });

  it("includes tag detail pages", async () => {
    const { default: sitemap } = await import("@/app/sitemap");
    const entries = await sitemap();
    const urls = entries.map((e: { url: string }) => e.url);
    expect(urls.some((u: string) => /\/tags\/[a-z]/.test(u))).toBe(true);
  });

  it("returns valid sitemap entries with required fields", async () => {
    const { default: sitemap } = await import("@/app/sitemap");
    const entries = await sitemap();
    for (const entry of entries) {
      expect(entry).toHaveProperty("url");
      expect(entry).toHaveProperty("lastModified");
    }
  });
});
