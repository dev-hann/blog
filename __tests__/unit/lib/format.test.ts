import { describe, it, expect } from "vitest";
import { formatDate } from "@/lib/format";

describe("formatDate", () => {
  it("formats date string to Korean format", () => {
    expect(formatDate("2026-04-06")).toBe("2026년 04월 06일");
  });

  it("formats single-digit month and day", () => {
    expect(formatDate("2026-01-05")).toBe("2026년 01월 05일");
  });
});
