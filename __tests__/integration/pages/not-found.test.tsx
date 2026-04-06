import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import NotFound from "@/app/not-found";

vi.mock("next/link", () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

vi.mock("next/navigation", () => ({
  usePathname: () => "/non-existent",
  useRouter: () => ({ push: vi.fn() }),
}));

describe("NotFound", () => {
  it("renders 404 message", () => {
    render(<NotFound />);
    expect(screen.getByText("404")).toBeTruthy();
    expect(screen.getByText(/페이지를 찾을 수 없습니다/)).toBeTruthy();
  });

  it("has link to home", () => {
    render(<NotFound />);
    const homeLink = screen.getByText(/홈으로 돌아가기/);
    expect(homeLink).toBeTruthy();
    expect(homeLink.getAttribute("href")).toBe("/");
  });
});
