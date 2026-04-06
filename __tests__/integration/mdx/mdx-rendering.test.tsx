import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import CustomLink from "@/components/mdx/CustomLink";
import Pre from "@/components/mdx/Pre";

describe("CustomLink", () => {
  it("external links open in new tab", () => {
    render(<CustomLink href="https://example.com">외부 링크</CustomLink>);
    const link = screen.getByText("외부 링크");
    expect(link.getAttribute("target")).toBe("_blank");
    expect(link.getAttribute("rel")).toBe("noopener noreferrer");
  });

  it("internal links use regular anchor", () => {
    render(<CustomLink href="/posts/test">내부 링크</CustomLink>);
    const link = screen.getByText("내부 링크");
    expect(link.getAttribute("target")).toBeNull();
    expect(link.getAttribute("href")).toBe("/posts/test");
  });
});

describe("Pre", () => {
  it("renders code block with content", () => {
    render(
      <Pre>
        <code>{"const greeting = 'hello';"}</code>
      </Pre>
    );
    expect(screen.getByText(/const greeting/)).toBeTruthy();
  });
});
