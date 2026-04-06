import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Header from "@/components/layout/Header";

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

vi.mock("next/link", () => ({
  default: ({ children, href }: any) => <a href={href}>{children}</a>,
}));

describe("Header", () => {
  it("renders ~/blog link for home", () => {
    render(<Header />);
    expect(screen.getByText("blog")).toBeTruthy();
  });

  it("renders all nav links with ~/ prefix", () => {
    render(<Header />);
    const links = ["blog", "posts", "tags", "about", "projects", "search"];
    links.forEach((label) => {
      expect(screen.getByText(label)).toBeTruthy();
    });
  });

  it("renders correct hrefs for nav links", () => {
    render(<Header />);
    expect(screen.getByText("posts").closest("a")?.getAttribute("href")).toBe("/posts");
    expect(screen.getByText("tags").closest("a")?.getAttribute("href")).toBe("/tags");
    expect(screen.getByText("about").closest("a")?.getAttribute("href")).toBe("/about");
  });

  it("renders mobile menu button", () => {
    render(<Header />);
    expect(screen.getByLabelText("Toggle menu")).toBeTruthy();
  });

  it("renders tilde prefix for each link", () => {
    render(<Header />);
    const tildeElements = screen.getAllByText("~/");
    expect(tildeElements.length).toBeGreaterThanOrEqual(6);
  });
});
