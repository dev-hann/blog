import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import PostsPage from "@/app/posts/page";

vi.mock("next/link", () => ({
  default: ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => <a href={href}>{children}</a>,
}));

vi.mock("next/navigation", () => ({
  usePathname: () => "/posts",
  useRouter: () => ({ push: vi.fn() }),
}));

describe("PostsPage", () => {
  it("renders cat ~/posts prompt", () => {
    render(<PostsPage />);
    expect(screen.getByText(/cat ~\/posts/)).toBeTruthy();
  });

  it("renders all posts", () => {
    render(<PostsPage />);
    expect(screen.getByText("Next.js 16으로 블로그 만들기")).toBeTruthy();
    expect(
      screen.getByText("React 19 Server Components 실전 가이드")
    ).toBeTruthy();
    expect(screen.getByText("TypeScript 6 새로운 기능")).toBeTruthy();
  });

  it("groups posts by year", () => {
    render(<PostsPage />);
    expect(screen.getByText(/## 2026/)).toBeTruthy();
  });

  it("each post links to detail", () => {
    render(<PostsPage />);
    const links = screen.getAllByRole("link");
    const hrefs = links.map((l) => l.getAttribute("href"));
    expect(hrefs).toContain("/posts/nextjs-blog-guide");
    expect(hrefs).toContain("/posts/react-server-components");
    expect(hrefs).toContain("/posts/typescript-6-features");
  });
});
