import { describe, it, expect, vi } from "vitest";

vi.mock("@/lib/constants", () => ({
  SITE_CONFIG: { url: "https://blog.dev", name: "Blog", description: "", author: "", github: "", postsPerPage: 10 },
}));

describe("robots", () => {
  it("allows all crawlers", async () => {
    const mod = await import("@/app/robots");
    const result = mod.default();
    expect(result.rules).toEqual({ userAgent: "*", allow: "/" });
  });

  it("includes sitemap URL", async () => {
    const mod = await import("@/app/robots");
    const result = mod.default();
    expect(result.sitemap).toContain("/sitemap.xml");
  });
});
