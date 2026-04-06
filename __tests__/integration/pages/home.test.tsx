import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

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
  usePathname: () => "/",
  useRouter: () => ({ push: vi.fn() }),
}));

describe("HomePage", () => {
  it("renders whoami prompt section", () => {
    render(<Home />);
    expect(screen.getByText("whoami")).toBeTruthy();
  });

  it("renders author name and description", () => {
    render(<Home />);
    expect(screen.getByText(/hann/)).toBeTruthy();
    expect(screen.getByText(/개인 기술 블로그/)).toBeTruthy();
  });

  it("renders ls prompt for recent posts", () => {
    render(<Home />);
    expect(screen.getByText(/ls -t ~\/posts \| head -5/)).toBeTruthy();
  });

  it("renders latest 5 posts", () => {
    render(<Home />);
    expect(screen.getByText("Next.js 16으로 블로그 만들기")).toBeTruthy();
    expect(
      screen.getByText("React 19 Server Components 실전 가이드")
    ).toBeTruthy();
    expect(screen.getByText("TypeScript 6 새로운 기능")).toBeTruthy();
  });

  it("each post links to detail page", () => {
    render(<Home />);
    const links = screen.getAllByRole("link");
    const hrefs = links.map((l) => l.getAttribute("href"));
    expect(hrefs).toContain("/posts/nextjs-blog-guide");
    expect(hrefs).toContain("/posts/react-server-components");
    expect(hrefs).toContain("/posts/typescript-6-features");
  });
});
