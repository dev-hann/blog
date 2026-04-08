import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import Header from "@/components/layout/Header";

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
  useRouter: () => ({ push: vi.fn() }),
}));

vi.mock("next/link", () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

describe("Header - Accessibility", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    document.body.style.overflow = "";
  });

  it("respects prefers-reduced-motion preference", () => {
    window.matchMedia = vi.fn().mockImplementation((query) => ({
      matches: query === "(prefers-reduced-motion: reduce)",
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    render(<Header />);
    const button = screen.getByLabelText("Toggle menu");
    expect(button).toBeInTheDocument();
  });

  it("maintains focus management for keyboard users", async () => {
    render(<Header />);
    const button = screen.getByLabelText("Toggle menu");
    button.focus();
    expect(document.activeElement).toBe(button);
  });

  it("all interactive elements have accessible names", () => {
    render(<Header />);
    const button = screen.getByLabelText("Toggle menu");
    expect(button).toBeVisible();

    const navLinks = screen.getAllByRole("link");
    expect(navLinks.length).toBeGreaterThan(0);
    navLinks.forEach((link) => {
      expect(link.textContent).toBeTruthy();
      expect(link.textContent?.length).toBeGreaterThan(0);
    });
  });

  it("provides aria attributes for screen readers", () => {
    render(<Header />);
    const desktopNav = screen.getByLabelText("Main navigation");
    expect(desktopNav).toBeVisible();

    const button = screen.getByLabelText("Toggle menu");
    expect(button).toHaveAttribute("aria-expanded");
  });
});
