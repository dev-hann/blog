import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("next/link", () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
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
});
