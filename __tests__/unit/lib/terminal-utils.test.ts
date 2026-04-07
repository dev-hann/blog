import { describe, it, expect } from "vitest";
import { genId } from "@/lib/terminal/utils";

describe("genId", () => {
  it("returns a string", () => {
    expect(typeof genId()).toBe("string");
  });

  it("returns unique values on successive calls", () => {
    const ids = new Set(Array.from({ length: 100 }, () => genId()));
    expect(ids.size).toBe(100);
  });

  it("returns non-empty string", () => {
    expect(genId().length).toBeGreaterThan(0);
  });
});
