import { describe, it, expect, vi } from "vitest";
import { render, screen, act } from "@testing-library/react";

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
  getPostBySlug: () => ({ slug: "post-1", title: "First Post", date: "2026-04-06", tags: ["nextjs"], summary: "First summary", content: "# Hello" }),
}));

vi.mock("@/lib/mdx-html", () => ({
  renderMDXToHTML: async () => "<p>Hello</p>",
}));

vi.mock("@/components/terminal/CommandInput", () => ({
  default: () => <div data-testid="command-input" />,
}));

vi.mock("@/components/terminal/OutputRenderer", () => ({
  default: ({ line }: { line: { content: string } }) => (
    <div data-testid="output-line">{line.content}</div>
  ),
}));

vi.mock("@/lib/terminal/commands", () => ({
  executeCommand: async () => ({ lines: [] }),
}));

describe("Home page", () => {
  it("renders terminal component with welcome message", async () => {
    const { default: HomePage } = await import("@/app/page");
    await act(async () => {
      render(await HomePage());
    });
    expect(screen.getByText(/Welcome to hann/i)).toBeInTheDocument();
  });

  it("renders command input", async () => {
    const { default: HomePage } = await import("@/app/page");
    await act(async () => {
      render(await HomePage());
    });
    expect(screen.getByTestId("command-input")).toBeInTheDocument();
  });

  it("renders h1 with site name", async () => {
    const { default: HomePage } = await import("@/app/page");
    await act(async () => {
      render(await HomePage());
    });
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Blog");
  });

  it("renders noscript fallback with quick navigation links", async () => {
    const { default: HomePage } = await import("@/app/page");
    let container: HTMLElement;
    await act(async () => {
      const result = render(await HomePage());
      container = result.container;
    });
    const noscript = container!.querySelector("noscript");
    expect(noscript).toBeInTheDocument();
    expect(noscript?.getAttribute("data-noscript")).toBe("true");
  });
});
