import { describe, it, expect } from "vitest";
import { isValidDate } from "@/lib/posts";

describe("lib/posts - isValidDate", () => {
  it("returns true for valid ISO dates", () => {
    expect(isValidDate("2026-01-01")).toBe(true);
    expect(isValidDate("2025-12-31")).toBe(true);
    expect(isValidDate("2024-02-29")).toBe(true);
  });

  it("returns false for invalid date strings", () => {
    expect(isValidDate("invalid-date")).toBe(false);
    expect(isValidDate("2026-13-01")).toBe(false);
    expect(isValidDate("2026-01-32")).toBe(false);
    expect(isValidDate("not-a-date")).toBe(false);
    expect(isValidDate("")).toBe(false);
    expect(isValidDate("2026/01/01")).toBe(false);
  });

  it("returns false for undefined or null", () => {
    expect(isValidDate(undefined as unknown as string)).toBe(false);
    expect(isValidDate(null as unknown as string)).toBe(false);
  });

  it("returns false for non-string types", () => {
    expect(isValidDate(123 as unknown as string)).toBe(false);
    expect(isValidDate({} as unknown as string)).toBe(false);
    expect(isValidDate([] as unknown as string)).toBe(false);
  });

  it("handles malformed dates correctly", () => {
    expect(isValidDate("2026-13-45")).toBe(false);
    expect(isValidDate("2026-00-00")).toBe(false);
  });

  it("verifies exact ISO format match", () => {
    const date = "2026-01-01";
    expect(isValidDate(date)).toBe(true);
    expect(new Date(date).toISOString().startsWith(date)).toBe(true);
  });
});
