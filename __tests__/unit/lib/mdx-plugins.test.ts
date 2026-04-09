import { describe, it, expect } from "vitest";
import { rehypePlugins } from "@/lib/mdx-plugins";

describe("mdx-plugins", () => {
  it("exports rehypePlugins array", () => {
    expect(rehypePlugins).toBeDefined();
    expect(Array.isArray(rehypePlugins)).toBe(true);
  });

  it("contains expected plugins", () => {
    expect(rehypePlugins.length).toBeGreaterThanOrEqual(2);
    expect(rehypePlugins[0]).toBeDefined();
    expect(rehypePlugins[1]).toBeDefined();
  });

  it("rehypePrettyCode has correct configuration", () => {
    const prettyCodePlugin = rehypePlugins[1];
    expect(Array.isArray(prettyCodePlugin)).toBe(true);
    expect(prettyCodePlugin[1]).toEqual({
      theme: "github-dark",
      showLineNumbers: true,
    });
  });
});
