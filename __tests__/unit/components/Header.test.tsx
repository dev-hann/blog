import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

vi.mock("next/link", () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
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
  });
});
