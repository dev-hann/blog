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

describe("Not Found page", () => {
  it("renders 404 message", async () => {
    const { default: NotFound } = await import("@/app/not-found");
    render(<NotFound />);
    expect(screen.getByText("404")).toBeInTheDocument();
  });

  it("has link to home", async () => {
    const { default: NotFound } = await import("@/app/not-found");
    render(<NotFound />);
    const homeLink = screen.getByRole("link", { name: /home/i });
    expect(homeLink).toHaveAttribute("href", "/");
  });
});
