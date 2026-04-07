import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("next/link", () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

vi.mock("next/navigation", () => ({
  usePathname: () => "/search",
  useRouter: () => ({ push: vi.fn() }),
}));

vi.mock("@/lib/posts", () => ({
  getAllPosts: () => [
    { slug: "post-1", title: "Next.js Guide", date: "2026-04-06", tags: ["nextjs"], summary: "Learn Next.js" },
    { slug: "post-2", title: "React Hooks", date: "2026-04-05", tags: ["react"], summary: "React hooks guide" },
  ],
}));

describe("Search page", () => {
  it("renders search heading", async () => {
    const { default: SearchPage } = await import("@/app/search/page");
    render(<SearchPage />);
    expect(
      screen.getByRole("heading", { name: /search/i, level: 1 })
    ).toBeInTheDocument();
  });

  it("renders search input", async () => {
    const { default: SearchPage } = await import("@/app/search/page");
    render(<SearchPage />);
    expect(
      screen.getByPlaceholderText(/search/i)
    ).toBeInTheDocument();
  });

  it("shows all posts initially", async () => {
    const { default: SearchPage } = await import("@/app/search/page");
    render(<SearchPage />);
    expect(screen.getByText("Next.js Guide")).toBeInTheDocument();
    expect(screen.getByText("React Hooks")).toBeInTheDocument();
  });
});
