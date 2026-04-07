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

describe("About page", () => {
  it("renders about content with author name", async () => {
    const { default: AboutPage } = await import("@/app/about/page");
    render(<AboutPage />);
    expect(screen.getByRole("heading", { name: /^about$/i, level: 1 })).toBeInTheDocument();
    expect(screen.getByText(/hann/)).toBeInTheDocument();
  });

  it("renders GitHub link", async () => {
    const { default: AboutPage } = await import("@/app/about/page");
    render(<AboutPage />);
    const githubLinks = screen.getAllByRole("link", { name: /github/i }).filter(
      (l) => l.getAttribute("href") === "https://github.com/hann"
    );
    expect(githubLinks.length).toBeGreaterThanOrEqual(1);
  });

  it("external GitHub link has screen reader new-tab indication", async () => {
    const { default: AboutPage } = await import("@/app/about/page");
    render(<AboutPage />);
    const githubLink = screen.getAllByRole("link").find(
      (l) => l.getAttribute("href") === "https://github.com/hann"
    );
    expect(githubLink).toBeTruthy();
    const srOnly = githubLink!.querySelector(".sr-only");
    expect(srOnly).toHaveTextContent("opens in new tab");
  });
});
