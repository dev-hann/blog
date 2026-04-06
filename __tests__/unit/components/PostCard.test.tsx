import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import PostCard from "@/components/post/PostCard";

vi.mock("next/link", () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

const mockPost = {
  slug: "test-post",
  title: "테스트 포스트 제목",
  date: "2026-04-06",
  summary: "테스트 포스트 요약입니다.",
  tags: ["react", "nextjs"],
};

describe("PostCard", () => {
  it("renders title, date, summary, tags", () => {
    render(<PostCard {...mockPost} />);
    expect(screen.getByText("테스트 포스트 제목")).toBeTruthy();
    expect(screen.getByText(/2026년/)).toBeTruthy();
    expect(screen.getByText("테스트 포스트 요약입니다.")).toBeTruthy();
    expect(screen.getByText("react")).toBeTruthy();
    expect(screen.getByText("nextjs")).toBeTruthy();
  });

  it("links to correct slug", () => {
    render(<PostCard {...mockPost} />);
    const link = screen.getByRole("link");
    expect(link.getAttribute("href")).toBe("/posts/test-post");
  });

  it("formats date in Korean", () => {
    render(<PostCard {...mockPost} />);
    expect(screen.getByText("2026년 4월 6일")).toBeTruthy();
  });
});
