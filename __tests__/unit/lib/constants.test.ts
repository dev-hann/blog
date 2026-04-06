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
});
