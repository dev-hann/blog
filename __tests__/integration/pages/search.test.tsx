import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";

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

  it("filters posts after debounce", async () => {
    vi.useFakeTimers();
    const { default: SearchPage } = await import("@/app/search/page");
    render(<SearchPage />);
    const input = screen.getByPlaceholderText(/search/i);
    fireEvent.change(input, { target: { value: "React" } });
    await act(async () => {
      vi.advanceTimersByTime(400);
    });
    expect(screen.getByText("React Hooks")).toBeInTheDocument();
    expect(screen.queryByText("Next.js Guide")).not.toBeInTheDocument();
    vi.useRealTimers();
  });

  it("shows no results message for unmatched query", async () => {
    vi.useFakeTimers();
    const { default: SearchPage } = await import("@/app/search/page");
    render(<SearchPage />);
    const input = screen.getByPlaceholderText(/search/i);
    fireEvent.change(input, { target: { value: "nonexistent" } });
    await act(async () => {
      vi.advanceTimersByTime(400);
    });
    expect(screen.getByText(/no results found/i)).toBeInTheDocument();
    vi.useRealTimers();
  });

  it("post results link to detail pages", async () => {
    const { default: SearchPage } = await import("@/app/search/page");
    render(<SearchPage />);
    const link = screen.getByText("Next.js Guide").closest("a");
    expect(link).toHaveAttribute("href", "/posts/post-1");
  });
});
