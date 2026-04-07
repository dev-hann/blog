import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

vi.mock("next/link", () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

describe("TableOfContents", () => {
  it("generates TOC from headings", async () => {
    const { default: TableOfContents } = await import("@/components/post/TableOfContents");
    const headings = [
      { id: "intro", text: "Introduction", level: 2 },
      { id: "getting-started", text: "Getting Started", level: 2 },
      { id: "setup", text: "Setup", level: 3 },
    ];
    render(<TableOfContents headings={headings} />);
    expect(screen.getByText("Introduction")).toBeInTheDocument();
    expect(screen.getByText("Getting Started")).toBeInTheDocument();
    expect(screen.getByText("Setup")).toBeInTheDocument();
  });

  it("links to correct heading ids", async () => {
    const { default: TableOfContents } = await import("@/components/post/TableOfContents");
    const headings = [
      { id: "intro", text: "Introduction", level: 2 },
      { id: "details", text: "Details", level: 3 },
    ];
    render(<TableOfContents headings={headings} />);
    expect(screen.getByText("Introduction")).toHaveAttribute("href", "#intro");
    expect(screen.getByText("Details")).toHaveAttribute("href", "#details");
  });

  it("renders nothing when headings is empty", async () => {
    const { default: TableOfContents } = await import("@/components/post/TableOfContents");
    const { container } = render(<TableOfContents headings={[]} />);
    expect(container.querySelector("nav")).toBeNull();
  });

  it("has mobile toggle button", async () => {
    const { default: TableOfContents } = await import("@/components/post/TableOfContents");
    const headings = [
      { id: "intro", text: "Introduction", level: 2 },
    ];
    render(<TableOfContents headings={headings} />);
    expect(screen.getByLabelText("Toggle table of contents")).toBeInTheDocument();
  });

  it("nav has aria-label", async () => {
    const { default: TableOfContents } = await import("@/components/post/TableOfContents");
    const headings = [
      { id: "intro", text: "Introduction", level: 2 },
    ];
    render(<TableOfContents headings={headings} />);
    expect(screen.getByLabelText("Table of contents")).toBeInTheDocument();
  });

  it("toggles mobile TOC visibility", async () => {
    const user = userEvent.setup();
    const { default: TableOfContents } = await import("@/components/post/TableOfContents");
    const headings = [
      { id: "intro", text: "Introduction", level: 2 },
      { id: "details", text: "Details", level: 3 },
    ];
    render(<TableOfContents headings={headings} />);
    const toggle = screen.getByLabelText("Toggle table of contents");
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    await user.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "true");
  });
});
