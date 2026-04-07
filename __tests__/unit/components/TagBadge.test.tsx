import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("next/link", () => ({
  default: ({ children, href, ...props }: { children: React.ReactNode; href: string; [key: string]: unknown }) => (
    <a href={href} {...props}>{children}</a>
  ),
}));

describe("TagBadge", () => {
  it("renders tag name", async () => {
    const { default: TagBadge } = await import("@/components/tag/TagBadge");
    render(<TagBadge tag="nextjs" />);
    expect(screen.getByText("nextjs")).toBeInTheDocument();
  });

  it("renders count when provided", async () => {
    const { default: TagBadge } = await import("@/components/tag/TagBadge");
    render(<TagBadge tag="react" count={5} />);
    expect(screen.getByText("react")).toBeInTheDocument();
    expect(screen.getByText("(5)")).toBeInTheDocument();
  });

  it("links to /tags/[tag]", async () => {
    const { default: TagBadge } = await import("@/components/tag/TagBadge");
    render(<TagBadge tag="typescript" />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/tags/typescript");
  });

  it("has descriptive aria-label without count", async () => {
    const { default: TagBadge } = await import("@/components/tag/TagBadge");
    render(<TagBadge tag="nextjs" />);
    expect(screen.getByRole("link")).toHaveAttribute("aria-label", "Tag: nextjs");
  });

  it("has descriptive aria-label with count", async () => {
    const { default: TagBadge } = await import("@/components/tag/TagBadge");
    render(<TagBadge tag="react" count={3} />);
    expect(screen.getByRole("link")).toHaveAttribute("aria-label", "Tag: react, 3 posts");
  });

  it("has singular aria-label for count of 1", async () => {
    const { default: TagBadge } = await import("@/components/tag/TagBadge");
    render(<TagBadge tag="nextjs" count={1} />);
    expect(screen.getByRole("link")).toHaveAttribute("aria-label", "Tag: nextjs, 1 post");
  });
});
