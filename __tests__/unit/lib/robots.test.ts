import { describe, it, expect } from "vitest";

describe("robots.ts", () => {
  it("allows all crawlers", async () => {
    const { default: robots } = await import("@/app/robots");
    const result = await robots();
    expect(result.rules).toBeDefined();
    const rule = Array.isArray(result.rules) ? result.rules[0] : result.rules;
    expect(rule).toHaveProperty("userAgent", "*");
    expect(rule).toHaveProperty("allow", "/");
  });

  it("includes sitemap reference", async () => {
    const { default: robots } = await import("@/app/robots");
    const result = await robots();
    expect(result.sitemap).toContain("/sitemap.xml");
  });
});
