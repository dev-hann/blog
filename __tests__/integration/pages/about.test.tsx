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

describe("About page", () => {
  it("renders about content with author name", async () => {
    const { default: AboutPage } = await import("@/app/about/page");
    render(<AboutPage />);
    expect(screen.getByText("About")).toBeInTheDocument();
    expect(screen.getByText(/hann/)).toBeInTheDocument();
  });

  it("renders GitHub link", async () => {
    const { default: AboutPage } = await import("@/app/about/page");
    render(<AboutPage />);
    const githubLink = screen.getByRole("link", { name: /github/i });
    expect(githubLink).toHaveAttribute("href", "https://github.com/hann");
  });
});
