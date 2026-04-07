import { describe, it, expect } from "vitest";
import { calculateReadingTime } from "@/lib/reading-time";

describe("calculateReadingTime", () => {
  it("returns 1 minute for empty content", () => {
    expect(calculateReadingTime("")).toBe(1);
  });

  it("returns 1 minute for short content", () => {
    expect(calculateReadingTime("Hello world")).toBe(1);
  });

  it("calculates minutes based on word count", () => {
    const words = Array(401).fill("word").join(" ");
    expect(calculateReadingTime(words)).toBe(2);
  });

  it("calculates based on character count for CJK text", () => {
    const text = "가".repeat(500);
    expect(calculateReadingTime(text)).toBe(1);
  });

  it("calculates correctly for mixed content", () => {
    const text = "Hello world " + "나".repeat(500);
    expect(calculateReadingTime(text)).toBeGreaterThanOrEqual(1);
  });

  it("returns at least 1 minute", () => {
    expect(calculateReadingTime("a")).toBe(1);
  });
});
