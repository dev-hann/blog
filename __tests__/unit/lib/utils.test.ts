import { describe, it, expect } from "vitest";
import { escapeHtml } from "@/lib/utils";

describe("escapeHtml", () => {
  it("escapes ampersand", () => {
    expect(escapeHtml("a & b")).toBe("a &amp; b");
  });

  it("escapes less than", () => {
    expect(escapeHtml("a < b")).toBe("a &lt; b");
  });

  it("escapes greater than", () => {
    expect(escapeHtml("a > b")).toBe("a &gt; b");
  });

  it("escapes double quote", () => {
    expect(escapeHtml('a "b"')).toBe('a &quot;b&quot;');
  });

  it("escapes single quote", () => {
    expect(escapeHtml("a 'b'")).toBe("a &#39;b&#39;");
  });

  it("escapes all special characters", () => {
    expect(escapeHtml('& < > " \'')).toBe("&amp; &lt; &gt; &quot; &#39;");
  });

  it("does not escape normal text", () => {
    expect(escapeHtml("Hello, world!")).toBe("Hello, world!");
  });

  it("handles empty string", () => {
    expect(escapeHtml("")).toBe("");
  });

  it("handles complex case", () => {
    expect(escapeHtml('<script>alert("XSS")</script>')).toBe("&lt;script&gt;alert(&quot;XSS&quot;)&lt;/script&gt;");
  });
});