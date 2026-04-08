import React from "react";
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

describe("Projects page", () => {
  it("renders project cards", async () => {
    const { default: ProjectsPage } = await import("@/app/projects/page");
    render(<ProjectsPage />);
    expect(screen.getByRole("heading", { name: /projects/i, level: 1 })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /blog/i, level: 2 })).toBeInTheDocument();
  });

  it("project cards have external links", async () => {
    const { default: ProjectsPage } = await import("@/app/projects/page");
    render(<ProjectsPage />);
    const links = screen.getAllByRole("link");
    expect(links.length).toBeGreaterThanOrEqual(1);
  });

  it("project tags use TagBadge links", async () => {
    const { default: ProjectsPage } = await import("@/app/projects/page");
    render(<ProjectsPage />);
    const tagLinks = screen.getAllByRole("link").filter(
      (l) => l.getAttribute("href")?.startsWith("/tags/")
    );
    expect(tagLinks.length).toBeGreaterThanOrEqual(1);
    expect(tagLinks[0]).toHaveAttribute("href", "/tags/nextjs");
  });

  it("project articles have aria-labelledby", async () => {
    const { default: ProjectsPage } = await import("@/app/projects/page");
    render(<ProjectsPage />);
    const articles = screen.getAllByRole("article");
    for (const article of articles) {
      expect(article).toHaveAttribute("aria-labelledby");
      const labelledby = article.getAttribute("aria-labelledby");
      const heading = article.querySelector(`#${CSS.escape(labelledby!)}`);
      expect(heading).not.toBeNull();
    }
  });

  it("page heading has id for aria-labelledby reference", async () => {
    const { default: ProjectsPage } = await import("@/app/projects/page");
    const { container } = render(<ProjectsPage />);
    const h1 = container.querySelector("h1");
    expect(h1).toHaveAttribute("id");
  });
});
