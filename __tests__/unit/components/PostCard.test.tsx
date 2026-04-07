import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import PostCard from "@/components/post/PostCard";
import type { Post } from "@/types/post";

vi.mock("next/link", () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

const mockPost: Post = {
  slug: "test-post",
  title: "테스트 포스트 제목",
  date: "2026-04-06",
  tags: ["nextjs", "react"],
  summary: "이것은 테스트 포스트 요약입니다.",
};

describe("PostCard", () => {
  it("renders title, date, summary, and tags", () => {
    render(<PostCard post={mockPost} />);
    expect(screen.getByText("테스트 포스트 제목")).toBeInTheDocument();
    expect(screen.getByText("2026년 04월 06일")).toBeInTheDocument();
    expect(screen.getByText("이것은 테스트 포스트 요약입니다.")).toBeInTheDocument();
    expect(screen.getByText("nextjs")).toBeInTheDocument();
    expect(screen.getByText("react")).toBeInTheDocument();
  });

  it("links to /posts/[slug]", () => {
    render(<PostCard post={mockPost} />);
    const cardLink = screen.getByRole("link", { name: /테스트 포스트 제목/ });
    expect(cardLink).toHaveAttribute("href", "/posts/test-post");
  });

  it("time element has dateTime attribute", () => {
    render(<PostCard post={mockPost} />);
    const time = screen.getByText("2026년 04월 06일");
    expect(time).toHaveAttribute("datetime", "2026-04-06");
  });

  it("tags link to tag detail pages", () => {
    render(<PostCard post={mockPost} />);
    const nextjsLink = screen.getByRole("link", { name: "nextjs" });
    expect(nextjsLink).toHaveAttribute("href", "/tags/nextjs");
    const reactLink = screen.getByRole("link", { name: "react" });
    expect(reactLink).toHaveAttribute("href", "/tags/react");
  });

  it("article has aria-labelledby pointing to heading id", () => {
    render(<PostCard post={mockPost} />);
    const article = screen.getByRole("article");
    expect(article).toHaveAttribute("aria-labelledby");
    const labelledby = article.getAttribute("aria-labelledby");
    const heading = screen.getByText("테스트 포스트 제목");
    expect(heading).toHaveAttribute("id", labelledby);
  });

  it("wraps title and date in a header element", () => {
    const { container } = render(<PostCard post={mockPost} />);
    const header = container.querySelector("header");
    expect(header).toBeInTheDocument();
    expect(header).toContainHTML("테스트 포스트 제목");
    expect(header).toContainHTML("2026년 04월 06일");
  });
});
