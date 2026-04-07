import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";

describe("robots.txt", () => {
  const robots = readFileSync(resolve(process.cwd(), "public/robots.txt"), "utf-8");

  it("allows all crawlers", () => {
    expect(robots).toContain("User-agent: *");
    expect(robots).toContain("Allow:");
  });

  it("includes sitemap reference", () => {
    expect(robots).toContain("Sitemap:");
    expect(robots).toContain("/sitemap.xml");
  });
});
