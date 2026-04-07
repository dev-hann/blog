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

    it("passes className to internal link", async () => {
      const { default: CustomLink } = await import("@/components/mdx/CustomLink");
      const { container } = render(<CustomLink href="/about" className="custom-class">Styled</CustomLink>);
      expect(container.querySelector(".custom-class")).toBeInTheDocument();
    });

    it("external links have sr-only new tab indicator", async () => {
      const { default: CustomLink } = await import("@/components/mdx/CustomLink");
      render(<CustomLink href="https://example.com">External</CustomLink>);
      expect(screen.getByText("(opens in new tab)")).toBeInTheDocument();
    });

    it("internal links do not have sr-only new tab indicator", async () => {
      const { default: CustomLink } = await import("@/components/mdx/CustomLink");
      render(<CustomLink href="/about">Internal</CustomLink>);
      expect(screen.queryByText("(opens in new tab)")).not.toBeInTheDocument();
    });

    it("hash links render as anchor without next/link", async () => {
      const { default: CustomLink } = await import("@/components/mdx/CustomLink");
      render(<CustomLink href="#section-1">Jump to section</CustomLink>);
      const link = screen.getByText("Jump to section");
      expect(link).toHaveAttribute("href", "#section-1");
      expect(link).not.toHaveAttribute("target");
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
