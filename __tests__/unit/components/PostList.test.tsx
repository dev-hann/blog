import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { Post } from "@/types/post";

const mockSearchParamsGet = vi.fn((key: string) => (key === "page" ? null : null));
const mockRouterPush = vi.fn();
const mockRouterReplace = vi.fn();

vi.mock("next/navigation", () => ({
  useSearchParams: () => ({
    get: mockSearchParamsGet,
    toString: () => "",
  }),
  useRouter: () => ({
    push: mockRouterPush,
    replace: mockRouterReplace,
    prefetch: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
  }),
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
    const msg = screen.getByText("No posts found.");
    expect(msg).toBeInTheDocument();
    expect(msg).toHaveAttribute("role", "status");
  });

  it("post list content area has aria-live for page changes", async () => {
    const { default: PostList } = await import("@/components/post/PostList");
    const { container } = render(<PostList posts={mockPosts} postsPerPage={5} />);
    const liveRegion = container.querySelector("[aria-live='polite']");
    expect(liveRegion).toBeInTheDocument();
  });

  it("has aria-label on pagination buttons", async () => {
    const { default: PostList } = await import("@/components/post/PostList");
    render(<PostList posts={mockPosts} postsPerPage={5} />);
    expect(screen.getByLabelText("Previous page")).toBeInTheDocument();
    expect(screen.getByLabelText("Next page")).toBeInTheDocument();
  });

  it("pagination nav has aria-label", async () => {
    const { default: PostList } = await import("@/components/post/PostList");
    render(<PostList posts={mockPosts} postsPerPage={5} />);
    expect(screen.getByLabelText("Post list pagination")).toBeInTheDocument();
  });

  it("does not show pagination when all posts fit on one page", async () => {
    const { default: PostList } = await import("@/components/post/PostList");
    render(<PostList posts={mockPosts.slice(0, 3)} postsPerPage={10} />);
    expect(screen.queryByText("← Prev")).not.toBeInTheDocument();
    expect(screen.queryByText("Next →")).not.toBeInTheDocument();
  });

  it("active page button has aria-current page", async () => {
    const { default: PostList } = await import("@/components/post/PostList");
    render(<PostList posts={mockPosts} postsPerPage={5} />);
    const activeButton = screen.getByLabelText("Page 1");
    expect(activeButton).toHaveAttribute("aria-current", "page");
    const inactiveButton = screen.getByLabelText("Page 2");
    expect(inactiveButton).not.toHaveAttribute("aria-current");
  });

  it("aria-current moves when page changes", async () => {
    const user = userEvent.setup();
    const { default: PostList } = await import("@/components/post/PostList");
    render(<PostList posts={mockPosts} postsPerPage={5} />);
    await user.click(screen.getByLabelText("Page 2"));
    expect(screen.getByLabelText("Page 1")).not.toHaveAttribute("aria-current");
    expect(screen.getByLabelText("Page 2")).toHaveAttribute("aria-current", "page");
  });

  it("reads initial page from URL search params", async () => {
    mockSearchParamsGet.mockImplementation((key: string) => (key === "page" ? "2" : null));
    const { default: PostList } = await import("@/components/post/PostList");
    render(<PostList posts={mockPosts} postsPerPage={5} />);
    expect(screen.getByText("Post 6")).toBeInTheDocument();
    expect(screen.queryByText("Post 1")).not.toBeInTheDocument();
    mockSearchParamsGet.mockImplementation((key: string) => (key === "page" ? null : null));
  });

  it("syncs page state when searchParams change via re-render", async () => {
    mockSearchParamsGet.mockImplementation((key: string) => (key === "page" ? "3" : null));
    const { default: PostList } = await import("@/components/post/PostList");
    const { rerender } = render(<PostList posts={mockPosts} postsPerPage={5} />);
    expect(screen.getByText("Post 11")).toBeInTheDocument();
    mockSearchParamsGet.mockImplementation((key: string) => (key === "page" ? null : null));
    rerender(<PostList posts={mockPosts} postsPerPage={5} />);
    expect(screen.getByText("Post 1")).toBeInTheDocument();
    expect(screen.queryByText("Post 11")).not.toBeInTheDocument();
  });
});
