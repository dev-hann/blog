import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

vi.mock("next/link", () => ({
  default: ({ children, href, ...rest }: { children: React.ReactNode; href: string; [key: string]: unknown }) => (
    <a href={href} {...rest}>{children}</a>
  ),
}));

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
  useRouter: () => ({ push: vi.fn() }),
}));

describe("Header", () => {
  it("renders site name", async () => {
    const { default: Header } = await import("@/components/layout/Header");
    render(<Header />);
    expect(screen.getByText("Blog")).toBeInTheDocument();
  });

  it("renders all nav links", async () => {
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
    const { default: Header } = await import("@/components/layout/Header");
    render(<Header />);
    const homeLink = screen.getByText("Home").closest("a");
    expect(homeLink).toHaveAttribute("href", "/");
  });

  it("toggles mobile menu on hamburger click", async () => {
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
    const { default: Header } = await import("@/components/layout/Header");
    render(<Header />);
    const button = screen.getByLabelText("Toggle menu");
    expect(button).toHaveAttribute("aria-expanded", "false");
  });

  it("desktop nav has aria-label", async () => {
    const { default: Header } = await import("@/components/layout/Header");
    render(<Header />);
    expect(screen.getByLabelText("Main navigation")).toBeInTheDocument();
  });

  it("mobile nav has aria-label when open", async () => {
    const user = userEvent.setup();
    const { default: Header } = await import("@/components/layout/Header");
    render(<Header />);
    await user.click(screen.getByLabelText("Toggle menu"));
    expect(screen.getByLabelText("Mobile navigation")).toBeInTheDocument();
  });

  it("closes mobile menu on Escape key", async () => {
    const user = userEvent.setup();
    const { default: Header } = await import("@/components/layout/Header");
    render(<Header />);
    await user.click(screen.getByLabelText("Toggle menu"));
    expect(screen.getByLabelText("Toggle menu")).toHaveAttribute("aria-expanded", "true");
    await user.keyboard("{Escape}");
    expect(screen.getByLabelText("Toggle menu")).toHaveAttribute("aria-expanded", "false");
  });

  it("active link has aria-current page", async () => {
    const { default: Header } = await import("@/components/layout/Header");
    render(<Header />);
    const homeLink = screen.getByText("Home").closest("a");
    expect(homeLink).toHaveAttribute("aria-current", "page");
    const postsLink = screen.getByText("Posts").closest("a");
    expect(postsLink).not.toHaveAttribute("aria-current");
  });
});
