import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import AboutPage from "@/app/about/page";

vi.mock("next/link", () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

vi.mock("next/navigation", () => ({
  usePathname: () => "/about",
  useRouter: () => ({ push: vi.fn() }),
}));

describe("AboutPage", () => {
  it("renders about content with terminal prompt", () => {
    render(<AboutPage />);
    expect(screen.getByText(/cat ~\/about\.md/)).toBeTruthy();
    expect(screen.getByText("hann")).toBeTruthy();
  });

  it("renders social links", () => {
    render(<AboutPage />);
    const links = screen.getAllByRole("link");
    const hrefs = links.map((l) => l.getAttribute("href"));
    expect(hrefs).toContain("https://github.com/hann");
  });

  it("renders history section", () => {
    render(<AboutPage />);
    expect(screen.getByText("history")).toBeTruthy();
    expect(screen.getByText(/첫 코딩/)).toBeTruthy();
  });
});
