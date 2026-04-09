import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("next/link", () => ({
  default: ({ children, href, ...props }: { children: React.ReactNode; href: string; [key: string]: unknown }) => (
    <a href={href} {...props}>{children}</a>
  ),
}));

describe("PostNavigation", () => {
  const mockPrevPost = {
    slug: "previous-post",
    title: "Previous Post",
    date: "2026-04-05",
    tags: ["react"],
    summary: "Summary of previous post",
  };

  const mockNextPost = {
    slug: "next-post",
    title: "Next Post",
    date: "2026-04-07",
    tags: ["nextjs"],
    summary: "Summary of next post",
  };

  it("renders previous and next post links when both exist", async () => {
    const { default: PostNavigation } = await import("@/components/post/PostNavigation");
    render(<PostNavigation previous={mockPrevPost} next={mockNextPost} />);

    expect(screen.getByText("← Previous")).toBeInTheDocument();
    expect(screen.getByText("Next →")).toBeInTheDocument();
    expect(screen.getByText("Previous Post")).toBeInTheDocument();
    expect(screen.getByText("Next Post")).toBeInTheDocument();
  });

  it("links correctly to previous post", async () => {
    const { default: PostNavigation } = await import("@/components/post/PostNavigation");
    render(<PostNavigation previous={mockPrevPost} next={mockNextPost} />);

    const prevLink = screen.getByText("← Previous").closest("a");
    expect(prevLink).toHaveAttribute("href", "/posts/previous-post");
  });

  it("links correctly to next post", async () => {
    const { default: PostNavigation } = await import("@/components/post/PostNavigation");
    render(<PostNavigation previous={mockPrevPost} next={mockNextPost} />);

    const nextLink = screen.getByText("Next →").closest("a");
    expect(nextLink).toHaveAttribute("href", "/posts/next-post");
  });

  it("renders only next post when previous is null", async () => {
    const { default: PostNavigation } = await import("@/components/post/PostNavigation");
    render(<PostNavigation previous={null} next={mockNextPost} />);

    expect(screen.queryByText("← Previous")).not.toBeInTheDocument();
    expect(screen.getByText("Next →")).toBeInTheDocument();
    expect(screen.getByText("Next Post")).toBeInTheDocument();
  });

  it("renders only previous post when next is null", async () => {
    const { default: PostNavigation } = await import("@/components/post/PostNavigation");
    render(<PostNavigation previous={mockPrevPost} next={null} />);

    expect(screen.getByText("← Previous")).toBeInTheDocument();
    expect(screen.getByText("Previous Post")).toBeInTheDocument();
    expect(screen.queryByText("Next →")).not.toBeInTheDocument();
  });

  it("renders nothing when both are null", async () => {
    const { default: PostNavigation } = await import("@/components/post/PostNavigation");
    const { container } = render(<PostNavigation previous={null} next={null} />);

    expect(container.firstChild).toBeNull();
  });

  it("has proper ARIA labels", async () => {
    const { default: PostNavigation } = await import("@/components/post/PostNavigation");
    render(<PostNavigation previous={mockPrevPost} next={mockNextPost} />);

    const prevLink = screen.getByText("← Previous").closest("a");
    const nextLink = screen.getByText("Next →").closest("a");

    expect(prevLink).toHaveAttribute("aria-label", "Previous post: Previous Post");
    expect(nextLink).toHaveAttribute("aria-label", "Next post: Next Post");
  });
});
