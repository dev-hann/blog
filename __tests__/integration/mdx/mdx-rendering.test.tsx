import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("next/link", () => ({
  default: ({ children, href, ...props }: { children: React.ReactNode; href: string; [key: string]: unknown }) => (
    <a href={href} {...props}>{children}</a>
  ),
}));

describe("MDX custom components", () => {
  describe("CustomLink", () => {
    it("external links open in new tab", async () => {
      const { default: CustomLink } = await import("@/components/mdx/CustomLink");
      render(<CustomLink href="https://example.com">External</CustomLink>);
      const link = screen.getByText("External");
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    });

    it("internal links use next/link", async () => {
      const { default: CustomLink } = await import("@/components/mdx/CustomLink");
      render(<CustomLink href="/posts/test">Internal</CustomLink>);
      const link = screen.getByText("Internal");
      expect(link).toHaveAttribute("href", "/posts/test");
      expect(link).not.toHaveAttribute("target");
    });

    it("renders span when no href", async () => {
      const { default: CustomLink } = await import("@/components/mdx/CustomLink");
      const { container } = render(<CustomLink>No link</CustomLink>);
      expect(container.querySelector("a")).toBeNull();
      expect(screen.getByText("No link")).toBeInTheDocument();
    });
  });

  describe("Pre", () => {
    it("renders code block with styling", async () => {
      const { default: Pre } = await import("@/components/mdx/Pre");
      const { container } = render(<Pre><code>{'console.log("hello")'}</code></Pre>);
      const pre = container.querySelector("pre");
      expect(pre).toBeInTheDocument();
      expect(pre?.textContent).toContain("console.log");
    });
  });
});
