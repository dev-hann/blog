import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const mockState = vi.hoisted(() => ({ pathname: "/" }));

vi.mock("next/link", () => ({
  default: ({ children, href, ...rest }: { children: React.ReactNode; href: string; [key: string]: unknown }) => (
    <a href={href} {...rest}>{children}</a>
  ),
}));

vi.mock("next/navigation", () => ({
  usePathname: () => mockState.pathname,
  useRouter: () => ({ push: vi.fn() }),
}));

describe("Header", () => {
  it("renders site name", async () => {
    mockState.pathname = "/";
    const { default: Header } = await import("@/components/layout/Header");
    render(<Header />);
    expect(screen.getByText("Blog")).toBeInTheDocument();
  });

  it("renders all nav links", async () => {
    mockState.pathname = "/";
    const { default: Header } = await import("@/components/layout/Header");
    render(<Header />);
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Posts")).toBeInTheDocument();
    expect(screen.getByText("Tags")).toBeInTheDocument();
    expect(screen.getByText("Projects")).toBeInTheDocument();
    expect(screen.getByText("About")).toBeInTheDocument();
    expect(screen.getByText("Search")).toBeInTheDocument();
  });

  it("highlights active link based on current path", async () => {
    mockState.pathname = "/";
    const { default: Header } = await import("@/components/layout/Header");
    render(<Header />);
    const homeLink = screen.getByText("Home").closest("a");
    expect(homeLink).toHaveAttribute("href", "/");
  });

  it("toggles mobile menu on hamburger click", async () => {
    mockState.pathname = "/";
    const user = userEvent.setup();
    const { default: Header } = await import("@/components/layout/Header");
    render(<Header />);
    const button = screen.getByLabelText("Toggle menu");
    expect(button).toBeInTheDocument();

    await user.click(button);
    const mobileLinks = screen.getAllByText("Home");
    expect(mobileLinks.length).toBeGreaterThanOrEqual(2);
  });

  it("has aria-expanded on mobile toggle button", async () => {
    mockState.pathname = "/";
    const { default: Header } = await import("@/components/layout/Header");
    render(<Header />);
    const button = screen.getByLabelText("Toggle menu");
    expect(button).toHaveAttribute("aria-expanded", "false");
  });

  it("desktop nav has aria-label", async () => {
    mockState.pathname = "/";
    const { default: Header } = await import("@/components/layout/Header");
    render(<Header />);
    expect(screen.getByLabelText("Main navigation")).toBeInTheDocument();
  });

  it("mobile nav has aria-label when open", async () => {
    mockState.pathname = "/";
    const user = userEvent.setup();
    const { default: Header } = await import("@/components/layout/Header");
    render(<Header />);
    await user.click(screen.getByLabelText("Toggle menu"));
    expect(screen.getByLabelText("Mobile navigation")).toBeInTheDocument();
  });

  it("closes mobile menu on Escape key", async () => {
    mockState.pathname = "/";
    const user = userEvent.setup();
    const { default: Header } = await import("@/components/layout/Header");
    render(<Header />);
    await user.click(screen.getByLabelText("Toggle menu"));
    expect(screen.getByLabelText("Toggle menu")).toHaveAttribute("aria-expanded", "true");
    await user.keyboard("{Escape}");
    expect(screen.getByLabelText("Toggle menu")).toHaveAttribute("aria-expanded", "false");
  });

  it("active link has aria-current page", async () => {
    mockState.pathname = "/";
    const { default: Header } = await import("@/components/layout/Header");
    render(<Header />);
    const homeLink = screen.getByText("Home").closest("a");
    expect(homeLink).toHaveAttribute("aria-current", "page");
    const postsLink = screen.getByText("Posts").closest("a");
    expect(postsLink).not.toHaveAttribute("aria-current");
  });

  it("highlights Posts link on sub-path /posts/[slug]", async () => {
    mockState.pathname = "/posts/test-post";
    const { default: Header } = await import("@/components/layout/Header");
    render(<Header />);
    const postsLink = screen.getByText("Posts").closest("a");
    expect(postsLink).toHaveAttribute("aria-current", "page");
    const homeLink = screen.getByText("Home").closest("a");
    expect(homeLink).not.toHaveAttribute("aria-current");
  });

  it("highlights Tags link on sub-path /tags/[tag]", async () => {
    mockState.pathname = "/tags/react";
    const { default: Header } = await import("@/components/layout/Header");
    render(<Header />);
    const tagsLink = screen.getByText("Tags").closest("a");
    expect(tagsLink).toHaveAttribute("aria-current", "page");
  });

  it("does not highlight Home on non-root paths", async () => {
    mockState.pathname = "/about";
    const { default: Header } = await import("@/components/layout/Header");
    render(<Header />);
    const homeLink = screen.getByText("Home").closest("a");
    expect(homeLink).not.toHaveAttribute("aria-current");
    const aboutLink = screen.getByText("About").closest("a");
    expect(aboutLink).toHaveAttribute("aria-current", "page");
  });

  it("locks body scroll when mobile menu is open", async () => {
    mockState.pathname = "/";
    const user = userEvent.setup();
    const { default: Header } = await import("@/components/layout/Header");
    render(<Header />);
    await user.click(screen.getByLabelText("Toggle menu"));
    expect(document.body.style.overflow).toBe("hidden");
    await user.click(screen.getByLabelText("Toggle menu"));
    expect(document.body.style.overflow).toBe("");
  });

  it("restores focus to toggle button when mobile menu closes via Escape", async () => {
    mockState.pathname = "/";
    const user = userEvent.setup();
    const { default: Header } = await import("@/components/layout/Header");
    render(<Header />);
    const btn = screen.getByLabelText("Toggle menu");
    await user.click(btn);
    expect(btn).toHaveAttribute("aria-expanded", "true");
    await user.keyboard("{Escape}");
    expect(btn).toHaveAttribute("aria-expanded", "false");
    expect(btn).toHaveFocus();
  });

  it("traps Tab focus within mobile menu when open", async () => {
    mockState.pathname = "/";
    const user = userEvent.setup();
    const { default: Header } = await import("@/components/layout/Header");
    render(<Header />);
    const btn = screen.getByLabelText("Toggle menu");
    await user.click(btn);
    const mobileNav = screen.getByLabelText("Mobile navigation");
    const links = mobileNav.querySelectorAll("a");
    const lastLink = links[links.length - 1];
    lastLink.focus();
    await user.tab();
    expect(document.activeElement).not.toBe(document.body);
    const focusInMenu = mobileNav.contains(document.activeElement) || document.activeElement === btn;
    expect(focusInMenu).toBe(true);
  });
});
