import { describe, it, expect } from "vitest";
import { getSearchIndex } from "@/lib/search";

describe("getSearchIndex", () => {
  it("returns array", async () => {
    const index = await getSearchIndex();
    expect(Array.isArray(index)).toBe(true);
  });

  it("includes all non-draft posts", async () => {
    const index = await getSearchIndex();
    expect(index.length).toBeGreaterThan(0);
    for (const entry of index) {
      expect(entry).toHaveProperty("slug");
      expect(entry).toHaveProperty("title");
      expect(entry).toHaveProperty("summary");
      expect(entry).toHaveProperty("tags");
      expect(entry.draft).toBeFalsy();
    }
  });
});
