import { describe, it, expect } from "vitest";
import { formatDate } from "@/lib/format";

describe("formatDate", () => {
  it("formats date string to Korean format", () => {
    expect(formatDate("2026-04-06")).toBe("2026년 04월 06일");
  });

  it("formats single-digit month and day", () => {
    expect(formatDate("2026-01-05")).toBe("2026년 01월 05일");
  });

  it("returns original string for empty input", () => {
    expect(formatDate("")).toBe("");
  });

  it("returns original string for malformed input without dashes", () => {
    expect(formatDate("20260406")).toBe("20260406");
  });

  it("returns original string for partial date", () => {
    expect(formatDate("2026-04")).toBe("2026-04");
  });

  it("handles non-zero-padded month and day", () => {
    expect(formatDate("2026-4-6")).toBe("2026년 4월 6일");
  });

  it("handles mixed zero-padded and non-zero-padded", () => {
    expect(formatDate("2026-04-6")).toBe("2026년 04월 6일");
    expect(formatDate("2026-4-06")).toBe("2026년 4월 06일");
  });

  it("handles ISO timestamp format", () => {
    expect(formatDate("2026-04-05T12:00:00")).toBe("2026년 04월 05일");
  });

  it("handles ISO timestamp with timezone", () => {
    expect(formatDate("2026-04-05T12:00:00Z")).toBe("2026년 04월 05일");
    expect(formatDate("2026-04-05T12:00:00+09:00")).toBe("2026년 04월 05일");
  });
});
