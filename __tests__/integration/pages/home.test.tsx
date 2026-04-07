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

vi.mock("@/lib/posts", () => ({
  getAllPosts: () => [
    { slug: "post-1", title: "First Post", date: "2026-04-06", tags: ["nextjs"], summary: "First summary" },
  ],
  getAllTags: () => ({ nextjs: 1 }),
}));

vi.mock("@/components/terminal/CommandInput", () => ({
  default: () => <div data-testid="command-input" />,
}));

vi.mock("@/components/terminal/OutputRenderer", () => ({
  default: ({ line }: { line: { content: string } }) => (
    <div data-testid="output-line">{line.content}</div>
  ),
}));

describe("Home page", () => {
  it("renders terminal component with welcome message", async () => {
    const { default: HomePage } = await import("@/app/page");
    render(<HomePage />);
    expect(screen.getByText(/Welcome to hann/i)).toBeInTheDocument();
  });

  it("renders command input", async () => {
    const { default: HomePage } = await import("@/app/page");
    render(<HomePage />);
    expect(screen.getByTestId("command-input")).toBeInTheDocument();
  });
});
