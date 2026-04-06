import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import TagBadge from "@/components/tag/TagBadge";

vi.mock("next/link", () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

describe("TagBadge", () => {
  it("renders tag name in brackets", () => {
    render(<TagBadge tag="react" />);
    expect(screen.getByText("[react]")).toBeTruthy();
  });

  it("renders count when provided", () => {
    render(<TagBadge tag="react" count={5} />);
    expect(screen.getByText("(5)")).toBeTruthy();
  });

  it("links to tag page", () => {
    render(<TagBadge tag="react" />);
    const link = screen.getByRole("link");
    expect(link.getAttribute("href")).toBe("/tags/react");
  });
});
