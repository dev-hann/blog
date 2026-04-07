import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { Post } from "@/types/post";

vi.mock("next/link", () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

const mockPosts: Post[] = Array.from({ length: 15 }, (_, i) => ({
  slug: `post-${i + 1}`,
  title: `Post ${i + 1}`,
  date: `2026-04-${String(i + 1).padStart(2, "0")}`,
  tags: ["test"],
  summary: `Summary ${i + 1}`,
}));

describe("PostList", () => {
  it("renders posts on first page", async () => {
    const { default: PostList } = await import("@/components/post/PostList");
    render(<PostList posts={mockPosts} postsPerPage={5} />);
    expect(screen.getByText("Post 1")).toBeInTheDocument();
    expect(screen.getByText("Post 5")).toBeInTheDocument();
    expect(screen.queryByText("Post 6")).not.toBeInTheDocument();
  });

  it("navigates to next page", async () => {
    const user = userEvent.setup();
    const { default: PostList } = await import("@/components/post/PostList");
    render(<PostList posts={mockPosts} postsPerPage={5} />);
    await user.click(screen.getByText("Next →"));
    expect(screen.getByText("Post 6")).toBeInTheDocument();
    expect(screen.queryByText("Post 1")).not.toBeInTheDocument();
  });

  it("navigates to previous page", async () => {
    const user = userEvent.setup();
    const { default: PostList } = await import("@/components/post/PostList");
    render(<PostList posts={mockPosts} postsPerPage={5} />);
    await user.click(screen.getByText("Next →"));
    await user.click(screen.getByText("← Prev"));
    expect(screen.getByText("Post 1")).toBeInTheDocument();
  });

  it("disables prev button on first page", async () => {
    const { default: PostList } = await import("@/components/post/PostList");
    render(<PostList posts={mockPosts} postsPerPage={5} />);
    expect(screen.getByText("← Prev")).toBeDisabled();
  });

  it("disables next button on last page", async () => {
    const user = userEvent.setup();
    const { default: PostList } = await import("@/components/post/PostList");
    render(<PostList posts={mockPosts} postsPerPage={5} />);
    await user.click(screen.getByText("3"));
    expect(screen.getByText("Next →")).toBeDisabled();
  });

  it("shows empty message when no posts", async () => {
    const { default: PostList } = await import("@/components/post/PostList");
    render(<PostList posts={[]} />);
    expect(screen.getByText("No posts found.")).toBeInTheDocument();
  });

  it("does not show pagination when all posts fit on one page", async () => {
    const { default: PostList } = await import("@/components/post/PostList");
    render(<PostList posts={mockPosts.slice(0, 3)} postsPerPage={10} />);
    expect(screen.queryByText("← Prev")).not.toBeInTheDocument();
    expect(screen.queryByText("Next →")).not.toBeInTheDocument();
  });
});
