import { describe, it, expect } from "vitest";

describe("Sitemap", () => {
  it("includes all static pages", async () => {
    const { GET } = await import("@/app/sitemap.xml/route");
    const res = await GET();
    const xml = await res.text();
    expect(xml).toContain("/posts");
    expect(xml).toContain("/about");
    expect(xml).toContain("/projects");
    expect(xml).toContain("/search");
    expect(xml).toContain("/tags");
  });

  it("includes dynamic post pages", async () => {
    const { GET } = await import("@/app/sitemap.xml/route");
    const res = await GET();
    const xml = await res.text();
    expect(xml).toContain("/posts/");
  });

  it("includes tag detail pages", async () => {
    const { GET } = await import("@/app/sitemap.xml/route");
    const res = await GET();
    const xml = await res.text();
    expect(xml).toMatch(/\/tags\/[a-z]/);
  });

  it("returns XML content type", async () => {
    const { GET } = await import("@/app/sitemap.xml/route");
    const res = await GET();
    expect(res.headers.get("Content-Type")).toContain("application/xml");
  });
});
