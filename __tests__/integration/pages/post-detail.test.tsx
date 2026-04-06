import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import PostDetailPage from "@/app/posts/[slug]/page";

vi.mock("next/link", () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

vi.mock("next/navigation", () => ({
  usePathname: () => "/posts/nextjs-blog-guide",
  useRouter: () => ({ push: vi.fn() }),
  notFound: () => null,
}));

vi.mock("@/lib/mdx", () => ({
  renderMDX: (source: string) => (
    <div data-testid="mdx-content">{source}</div>
  ),
}));

vi.mock("@/components/comment/Giscus", () => ({
  default: () => <div data-testid="giscus-comment-section">Comments</div>,
}));

vi.mock("@/components/post/TableOfContents", () => ({
  default: ({ headings }: { headings: Array<{ id: string; text: string; level: number }> }) => (
    <nav data-testid="toc">{headings.map((h) => <span key={h.id}>{h.text}</span>)}</nav>
  ),
}));

describe("PostDetailPage", () => {
  it("renders post title, date, tags in terminal style", async () => {
    const page = await PostDetailPage({ params: Promise.resolve({ slug: "nextjs-blog-guide" }) });
    render(page);
    expect(screen.getByText(/cat ~\/posts\/nextjs-blog-guide\.mdx/)).toBeTruthy();
    expect(screen.getByText("Next.js 16으로 블로그 만들기")).toBeTruthy();
    expect(screen.getByText(/2026-/)).toBeTruthy();
    expect(screen.getByText("[nextjs]")).toBeTruthy();
    expect(screen.getByText("[react]")).toBeTruthy();
  });

  it("renders MDX content", async () => {
    const page = await PostDetailPage({ params: Promise.resolve({ slug: "nextjs-blog-guide" }) });
    render(page);
    expect(screen.getByTestId("mdx-content")).toBeTruthy();
  });

  it("returns notFound for non-existent slug", async () => {
    const result = await PostDetailPage({ params: Promise.resolve({ slug: "non-existent-post" }) });
    expect(result).toBeNull();
  });

  it("renders comment section", async () => {
    const page = await PostDetailPage({ params: Promise.resolve({ slug: "nextjs-blog-guide" }) });
    render(page);
    expect(screen.getByTestId("giscus-comment-section")).toBeTruthy();
  });

  it("renders frontmatter block with --- delimiters", async () => {
    const page = await PostDetailPage({ params: Promise.resolve({ slug: "nextjs-blog-guide" }) });
    render(page);
    const delimiters = screen.getAllByText("---");
    expect(delimiters.length).toBeGreaterThanOrEqual(2);
  });

  it("renders TagBadge for each tag", async () => {
    const page = await PostDetailPage({ params: Promise.resolve({ slug: "nextjs-blog-guide" }) });
    render(page);
    expect(screen.getByText("[nextjs]")).toBeTruthy();
    expect(screen.getByText("[react]")).toBeTruthy();
  });
});
