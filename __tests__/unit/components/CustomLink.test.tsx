import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("next/link", () => ({
  default: ({ children, href, ...props }: { children: React.ReactNode; href: string; [key: string]: unknown }) => (
    <a href={href} {...props}>{children}</a>
  ),
}));

describe("CustomLink", () => {
  it("renders external link with target blank", async () => {
    const { default: CustomLink } = await import("@/components/mdx/CustomLink");
    render(<CustomLink href="https://example.com">External</CustomLink>);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("renders internal link without target", async () => {
    const { default: CustomLink } = await import("@/components/mdx/CustomLink");
    render(<CustomLink href="/about">About</CustomLink>);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/about");
    expect(link).not.toHaveAttribute("target");
  });

  it("renders span when href is undefined", async () => {
    const { default: CustomLink } = await import("@/components/mdx/CustomLink");
    const { container } = render(<CustomLink>No href</CustomLink>);
    expect(container.querySelector("a")).toBeNull();
    expect(container.querySelector("span")).toBeInTheDocument();
  });

  it("shows sr-only indicator on external links", async () => {
    const { default: CustomLink } = await import("@/components/mdx/CustomLink");
    render(<CustomLink href="https://example.com">Link</CustomLink>);
    expect(screen.getByText("(opens in new tab)")).toHaveClass("sr-only");
  });

  it("does not show sr-only on internal links", async () => {
    const { default: CustomLink } = await import("@/components/mdx/CustomLink");
    render(<CustomLink href="/posts">Posts</CustomLink>);
    expect(screen.queryByText("(opens in new tab)")).not.toBeInTheDocument();
  });

  it("handles hash links as internal", async () => {
    const { default: CustomLink } = await import("@/components/mdx/CustomLink");
    render(<CustomLink href="#section">Section</CustomLink>);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "#section");
    expect(link).not.toHaveAttribute("target");
  });

  it("passes extra props through", async () => {
    const { default: CustomLink } = await import("@/components/mdx/CustomLink");
    const { container } = render(<CustomLink href="/test" className="text-bold">Test</CustomLink>);
    expect(container.querySelector(".text-bold")).toBeInTheDocument();
  });
});
