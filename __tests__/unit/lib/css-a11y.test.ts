import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";

const cssPath = resolve(__dirname, "../../../app/globals.css");
const css = readFileSync(cssPath, "utf-8");

describe("globals.css accessibility", () => {
  it("has scroll-margin-top for mdx headings", () => {
    expect(css).toContain("scroll-margin-top");
    expect(css).toMatch(/\.mdx-content\s+(h[23])/);
  });

  it("has prefers-reduced-motion media query", () => {
    expect(css).toContain("prefers-reduced-motion");
    expect(css).toContain("reduce");
  });

  it("disables animations in reduced-motion", () => {
    expect(css).toMatch(/prefers-reduced-motion:\s*reduce/);
    expect(css).toMatch(/animation[^;]*none/);
  });
});
