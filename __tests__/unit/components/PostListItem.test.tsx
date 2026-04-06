import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import PostListItem from "@/components/post/PostListItem";

vi.mock("next/link", () => ({
  default: ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => <a href={href}>{children}</a>,
}));

const mockPost = {
  slug: "test-post",
  title: "테스트 포스트 제목",
  date: "2026-04-06",
  summary: "테스트 포스트 요약입니다.",
  tags: ["react", "nextjs"],
};

describe("PostListItem", () => {
  it("renders title", () => {
    render(<PostListItem {...mockPost} />);
    expect(screen.getByText("테스트 포스트 제목")).toBeTruthy();
  });

  it("renders formatted date", () => {
    render(<PostListItem {...mockPost} />);
    expect(screen.getByText("2026-04-06")).toBeTruthy();
  });

  it("renders tags", () => {
    render(<PostListItem {...mockPost} />);
    expect(screen.getByText("react")).toBeTruthy();
    expect(screen.getByText("nextjs")).toBeTruthy();
  });

  it("links to correct slug", () => {
    render(<PostListItem {...mockPost} />);
    const link = screen.getByRole("link");
    expect(link.getAttribute("href")).toBe("/posts/test-post");
  });

  it("renders featured marker when featured is true", () => {
    render(<PostListItem {...mockPost} featured />);
    expect(screen.getByText("★")).toBeTruthy();
  });

  it("does not render featured marker by default", () => {
    render(<PostListItem {...mockPost} />);
    expect(screen.queryByText("★")).toBeNull();
  });
});
