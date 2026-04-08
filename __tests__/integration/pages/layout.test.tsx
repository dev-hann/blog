import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";

vi.mock("next/link", () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
  useRouter: () => ({ push: vi.fn() }),
}));

vi.mock("next/font/google", () => ({
  Geist: () => ({ variable: "--font-geist-sans" }),
  Geist_Mono: () => ({ variable: "--font-geist-mono" }),
}));

vi.mock("@/components/ui/ScrollToTop", () => ({
  default: () => null,
}));

describe("Root Layout accessibility", () => {
  beforeEach(() => {
    cleanup();
  });

  it("has skip-to-content link", async () => {
    const { default: Layout } = await import("@/app/layout");
    
    render(<Layout><div>Test</div></Layout>);
    
    const skipLink = screen.getByText("Skip to content");
    expect(skipLink).toBeInTheDocument();
    expect(skipLink.closest("a")).toHaveAttribute("href", "#main-content");
  });

  it("has main landmark with id main-content", async () => {
    const { default: Layout } = await import("@/app/layout");
    
    render(<Layout><div>Test</div></Layout>);
    
    const main = screen.getByRole("main");
    expect(main).toBeInTheDocument();
    expect(main).toHaveAttribute("id", "main-content");
  });

  it("renders children inside main", async () => {
    const { default: Layout } = await import("@/app/layout");
    
    render(<Layout><div data-testid="child">Child Content</div></Layout>);
    
    const main = screen.getByRole("main");
    expect(main).toContainElement(screen.getByTestId("child"));
  });
});
