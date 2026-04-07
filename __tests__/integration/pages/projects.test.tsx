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
});
