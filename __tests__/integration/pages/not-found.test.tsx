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
  it("renders bash error message", () => {
    render(<NotFound />);
    expect(screen.getByText(/no such file or directory/)).toBeTruthy();
  });

  it("has link to home", () => {
    render(<NotFound />);
    const homeLink = screen.getByText("Go to home");
    expect(homeLink).toBeTruthy();
    expect(homeLink.getAttribute("href")).toBe("/");
  });

  it("renders cd commands", () => {
    render(<NotFound />);
    expect(screen.getByText("cd ~/unknown-page")).toBeTruthy();
    expect(screen.getByText("cd ~/")).toBeTruthy();
  });
});
