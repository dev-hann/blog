import { describe, it, expect } from "vitest";
import { SITE_CONFIG } from "@/lib/constants";

describe("SITE_CONFIG", () => {
  it("has required fields", () => {
    expect(SITE_CONFIG).toHaveProperty("name");
    expect(SITE_CONFIG).toHaveProperty("description");
    expect(SITE_CONFIG).toHaveProperty("url");
    expect(SITE_CONFIG).toHaveProperty("author");
    expect(SITE_CONFIG).toHaveProperty("github");
    expect(SITE_CONFIG).toHaveProperty("postsPerPage");
    expect(typeof SITE_CONFIG.postsPerPage).toBe("number");
  });

  it("has url starting with https://", () => {
    expect(SITE_CONFIG.url).toMatch(/^https:\/\//);
  });

  it("has non-empty string fields", () => {
    expect(typeof SITE_CONFIG.name).toBe("string");
    expect(SITE_CONFIG.name.length).toBeGreaterThan(0);
    expect(typeof SITE_CONFIG.author).toBe("string");
    expect(SITE_CONFIG.author.length).toBeGreaterThan(0);
    expect(typeof SITE_CONFIG.description).toBe("string");
    expect(SITE_CONFIG.description.length).toBeGreaterThan(0);
  });
});
