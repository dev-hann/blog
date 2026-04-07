import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("next/link", () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

vi.mock("next/navigation", () => ({
  notFound: () => {
    throw new Error("NOT_FOUND");
  },
  usePathname: () => "/",
  useRouter: () => ({ push: vi.fn() }),
}));

vi.mock("@/lib/posts", () => ({
  getAllPosts: () => [
    { slug: "post-1", title: "First Post", date: "2026-04-06", tags: ["nextjs"], summary: "First summary" },
    { slug: "post-2", title: "Second Post", date: "2026-04-05", tags: ["react"], summary: "Second summary" },
  ],
  getPostBySlug: (slug: string) => {
    if (slug === "post-1") {
      return { slug: "post-1", title: "First Post", date: "2026-04-06", tags: ["nextjs"], summary: "First summary", content: "# Hello" };
    }
    throw new Error("Post not found");
  },
  getAdjacentPosts: () => ({ prev: null, next: null }),
}));

describe("Posts list page", () => {
  it("renders all posts sorted by date", async () => {
    const { default: PostsPage } = await import("@/app/posts/page");
    render(<PostsPage />);
    expect(screen.getByText("Posts")).toBeInTheDocument();
    expect(screen.getByText("First Post")).toBeInTheDocument();
    expect(screen.getByText("Second Post")).toBeInTheDocument();
  });

  it("links each post to its detail page", async () => {
    const { default: PostsPage } = await import("@/app/posts/page");
    render(<PostsPage />);
    const links = screen.getAllByRole("link");
    expect(links[0]).toHaveAttribute("href", "/posts/post-1");
    expect(links[1]).toHaveAttribute("href", "/posts/post-2");
  });
});
