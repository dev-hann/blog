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
  getPostBySlug: (slug: string) => {
    if (slug === "post-1") {
      return {
        slug: "post-1",
        title: "First Post",
        date: "2026-04-06",
        tags: ["nextjs", "react"],
        summary: "First summary",
        content: "# Hello\n\nWorld",
      };
    }
    throw new Error("Post not found");
  },
  getAdjacentPosts: () => ({
    prev: { slug: "prev-post", title: "Previous Post" },
    next: { slug: "next-post", title: "Next Post" },
  }),
  extractHeadings: () => [],
}));

vi.mock("@/lib/mdx", () => ({
  renderMDX: (source: string) => <div data-testid="mdx-content">{source}</div>,
}));

vi.mock("@/components/comment/Giscus", () => ({
  default: () => <div data-testid="giscus" />,
}));

vi.mock("@/components/post/TableOfContents", () => ({
  default: () => <nav data-testid="toc" />,
}));

describe("Post detail page", () => {
  it("renders post title, date, and tags", async () => {
    const { default: PostDetailPage } = await import("@/app/posts/[slug]/page");
    const params = Promise.resolve({ slug: "post-1" });
    const result = await PostDetailPage({ params });
    render(result);
    expect(screen.getByText("First Post")).toBeInTheDocument();
    expect(screen.getByText("2026-04-06")).toBeInTheDocument();
    expect(screen.getByText("nextjs")).toBeInTheDocument();
    expect(screen.getByTestId("mdx-content")).toBeInTheDocument();
  });

  it("calls notFound for non-existent slug", async () => {
    const { default: PostDetailPage } = await import("@/app/posts/[slug]/page");
    const params = Promise.resolve({ slug: "non-existent" });
    await expect(PostDetailPage({ params })).rejects.toThrow("NOT_FOUND");
  });

  it("renders comment section", async () => {
    const { default: PostDetailPage } = await import("@/app/posts/[slug]/page");
    const params = Promise.resolve({ slug: "post-1" });
    const result = await PostDetailPage({ params });
    render(result);
    expect(screen.getByTestId("giscus")).toBeInTheDocument();
  });

  it("renders table of contents", async () => {
    const { default: PostDetailPage } = await import("@/app/posts/[slug]/page");
    const params = Promise.resolve({ slug: "post-1" });
    const result = await PostDetailPage({ params });
    render(result);
    expect(screen.getByTestId("toc")).toBeInTheDocument();
  });

  it("renders prev/next navigation", async () => {
    const { default: PostDetailPage } = await import("@/app/posts/[slug]/page");
    const params = Promise.resolve({ slug: "post-1" });
    const result = await PostDetailPage({ params });
    render(result);
    expect(screen.getByText(/Previous Post/)).toBeInTheDocument();
    expect(screen.getByText(/Next Post/)).toBeInTheDocument();
  });
});
