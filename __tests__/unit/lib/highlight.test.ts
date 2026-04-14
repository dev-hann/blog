import { describe, it, expect } from "vitest";
import { highlightText } from "@/lib/highlight";

describe("highlightText", () => {
  it("returns original text when query is empty", () => {
    expect(highlightText("Hello world", "")).toBe("Hello world");
  });

  it("returns original text when query is only spaces", () => {
    expect(highlightText("Hello world", "   ")).toBe("Hello world");
  });

  it("highlights matching text (case insensitive)", () => {
    expect(highlightText("Hello world", "hello")).toBe("<mark>Hello</mark> world");
    expect(highlightText("Hello world", "HELLO")).toBe("<mark>Hello</mark> world");
  });

  it("highlights multiple matches", () => {
    expect(highlightText("hello hello world", "hello")).toBe(
      "<mark>hello</mark> <mark>hello</mark> world"
    );
  });

  it("escapes special regex characters", () => {
    expect(highlightText("Hello (world)", "(world)")).toBe("Hello <mark>(world)</mark>");
  });

  it("handles special characters in query", () => {
    expect(highlightText("Test. Case.", ".")).toBe("Test<mark>.</mark> Case<mark>.</mark>");
  });

  it("escapes HTML in text before highlighting", () => {
    expect(highlightText("Use <div> & React", "React")).toBe(
      "Use &lt;div&gt; &amp; <mark>React</mark>"
    );
  });

  it("escapes HTML in text when no query", () => {
    expect(highlightText("A < B & C > D", "")).toBe("A &lt; B &amp; C &gt; D");
  });

  it("escapes HTML in highlighted match", () => {
    expect(highlightText("find <script> here", "<script>")).toBe(
      "find <mark>&lt;script&gt;</mark> here"
    );
  });
});
