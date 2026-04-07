import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("next/link", () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

describe("Footer", () => {
  it("renders GitHub link", async () => {
    const { default: Footer } = await import("@/components/layout/Footer");
    render(<Footer />);
    const githubLink = screen.getByText("GitHub");
    expect(githubLink).toBeInTheDocument();
    expect(githubLink.closest("a")).toHaveAttribute("href", "https://github.com/hann");
  });

  it("renders RSS link", async () => {
    const { default: Footer } = await import("@/components/layout/Footer");
    render(<Footer />);
    const rssLink = screen.getByText("RSS");
    expect(rssLink).toBeInTheDocument();
    expect(rssLink.closest("a")).toHaveAttribute("href", "/feed.xml");
  });

  it("renders copyright", async () => {
    const { default: Footer } = await import("@/components/layout/Footer");
    render(<Footer />);
    expect(screen.getByText(/©/)).toBeInTheDocument();
  });

  it("footer links have nav with aria-label", async () => {
    const { default: Footer } = await import("@/components/layout/Footer");
    render(<Footer />);
    expect(screen.getByLabelText("Footer navigation")).toBeInTheDocument();
  });

  it("GitHub external link has screen reader new-tab indication", async () => {
    const { default: Footer } = await import("@/components/layout/Footer");
    render(<Footer />);
    const githubLink = screen.getByText("GitHub").closest("a");
    expect(githubLink).toBeInTheDocument();
    const srOnly = githubLink!.querySelector(".sr-only");
    expect(srOnly).toHaveTextContent("opens in new tab");
  });
});
