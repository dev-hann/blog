import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import ProjectsPage from "@/app/projects/page";

vi.mock("next/link", () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

vi.mock("next/navigation", () => ({
  usePathname: () => "/projects",
  useRouter: () => ({ push: vi.fn() }),
}));

describe("ProjectsPage", () => {
  it("renders project listing with ls prompt", () => {
    render(<ProjectsPage />);
    expect(screen.getByText(/ls -la ~\/projects/)).toBeTruthy();
    expect(screen.getByText("Blog/")).toBeTruthy();
  });

  it("project links work", () => {
    render(<ProjectsPage />);
    const links = screen.getAllByRole("link");
    const hrefs = links.map((l) => l.getAttribute("href"));
    expect(hrefs).toContain("https://github.com/hann");
  });

  it("renders project stack tags", () => {
    render(<ProjectsPage />);
    expect(screen.getByText("[nextjs]")).toBeTruthy();
    expect(screen.getByText("[typescript]")).toBeTruthy();
  });
});
