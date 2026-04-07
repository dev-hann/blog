import { describe, it, expect } from "vitest";
import { genId, escapeHtml } from "@/lib/terminal/utils";

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

describe("escapeHtml", () => {
  it("escapes ampersands", () => {
    expect(escapeHtml("a&b")).toBe("a&amp;b");
  });

  it("escapes angle brackets", () => {
    expect(escapeHtml("<script>")).toBe("&lt;script&gt;");
  });

  it("escapes double quotes", () => {
    expect(escapeHtml('a"b')).toBe("a&quot;b");
  });

  it("escapes single quotes", () => {
    expect(escapeHtml("a'b")).toBe("a&#39;b");
  });

  it("returns plain text unchanged", () => {
    expect(escapeHtml("hello world")).toBe("hello world");
  });

  it("escapes complex XSS string", () => {
    expect(escapeHtml("<img onerror='alert(1)'>")).toBe(
      "&lt;img onerror=&#39;alert(1)&#39;&gt;"
    );
  });
});
