import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor, act, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

vi.mock("next/link", () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
  useRouter: () => ({ push: vi.fn() }),
}));

const mockPosts = [
  { slug: "post-1", title: "Next.js Guide", date: "2026-04-06", tags: ["nextjs"], summary: "Learn Next.js" },
  { slug: "post-2", title: "React Hooks", date: "2026-04-05", tags: ["react"], summary: "React hooks guide" },
  { slug: "post-3", title: "TypeScript Tips", date: "2026-04-04", tags: ["typescript"], summary: "TS best practices" },
];

describe("SearchBar", () => {
  it("filters posts by title", async () => {
    const { default: SearchBar } = await import("@/components/search/SearchBar");
    const user = userEvent.setup();
    render(<SearchBar posts={mockPosts} />);
    const input = screen.getByPlaceholderText(/search/i);
    await user.type(input, "Next");
    await waitFor(() => {
      expect(screen.getByText("Next.js Guide")).toBeInTheDocument();
      expect(screen.queryByText("React Hooks")).not.toBeInTheDocument();
    });
  });

  it("shows all posts when input is empty", async () => {
    const { default: SearchBar } = await import("@/components/search/SearchBar");
    render(<SearchBar posts={mockPosts} />);
    expect(screen.getByText("Next.js Guide")).toBeInTheDocument();
    expect(screen.getByText("React Hooks")).toBeInTheDocument();
    expect(screen.getByText("TypeScript Tips")).toBeInTheDocument();
  });

  it("shows empty message when no results", async () => {
    const { default: SearchBar } = await import("@/components/search/SearchBar");
    const user = userEvent.setup();
    render(<SearchBar posts={mockPosts} />);
    const input = screen.getByPlaceholderText(/search/i);
    await user.type(input, "zzznonexistent");
    await waitFor(() => {
      expect(screen.getByText(/no results/i)).toBeInTheDocument();
    });
  });

  it("filters posts by tag", async () => {
    const { default: SearchBar } = await import("@/components/search/SearchBar");
    const user = userEvent.setup();
    render(<SearchBar posts={mockPosts} />);
    const input = screen.getByPlaceholderText(/search/i);
    await user.type(input, "typescript");
    await waitFor(() => {
      expect(screen.getByText("TypeScript Tips")).toBeInTheDocument();
      expect(screen.queryByText("Next.js Guide")).not.toBeInTheDocument();
    });
  });

  it("has accessible label on search input", async () => {
    const { default: SearchBar } = await import("@/components/search/SearchBar");
    render(<SearchBar posts={mockPosts} />);
    expect(screen.getByRole("searchbox")).toBeInTheDocument();
  });

  it("debounces input by 300ms", async () => {
    vi.useFakeTimers();
    const { default: SearchBar } = await import("@/components/search/SearchBar");
    render(<SearchBar posts={mockPosts} />);
    const input = screen.getByPlaceholderText(/search/i);

    act(() => {
      fireEvent.change(input, { target: { value: "Next" } });
    });

    act(() => {
      vi.advanceTimersByTime(150);
    });
    expect(screen.getByText("React Hooks")).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(200);
    });
    expect(screen.getByText("Next.js Guide")).toBeInTheDocument();
    expect(screen.queryByText("React Hooks")).not.toBeInTheDocument();

    vi.useRealTimers();
  });
});
