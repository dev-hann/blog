import { describe, it, expect, vi, beforeEach } from "vitest";
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

describe("Home page JSON-LD", () => {
  beforeEach(() => {
    document.head.innerHTML = "";
  });

  it("includes WebSite JSON-LD schema", async () => {
    const { default: HomePage } = await import("@/app/page");
    await act(async () => {
      render(await HomePage());
    });

    const scripts = document.querySelectorAll('script[type="application/ld+json"]');
    expect(scripts.length).toBeGreaterThan(0);

    let webSiteSchema = null;
    for (const script of scripts) {
      const jsonLd = JSON.parse(script.textContent || "{}");
      if (jsonLd["@type"] === "WebSite") {
        webSiteSchema = jsonLd;
        break;
      }
    }

    expect(webSiteSchema).not.toBeNull();
    expect(webSiteSchema).toMatchObject({
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: expect.any(String),
      url: expect.any(String),
      description: expect.any(String),
      author: { "@type": "Person", name: expect.any(String) },
    });
  });
});