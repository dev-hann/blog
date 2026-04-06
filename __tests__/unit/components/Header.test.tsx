import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Header from "@/components/layout/Header";

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

describe("Header", () => {
  it("renders site name", () => {
    render(<Header />);
    expect(screen.getByText("Blog")).toBeTruthy();
  });

  it("renders all nav links", () => {
    render(<Header />);
    expect(screen.getByText("Home")).toBeTruthy();
    expect(screen.getByText("Posts")).toBeTruthy();
    expect(screen.getByText("Tags")).toBeTruthy();
    expect(screen.getByText("Projects")).toBeTruthy();
    expect(screen.getByText("About")).toBeTruthy();
  });

  it("renders search link", () => {
    render(<Header />);
    expect(screen.getByText("Search")).toBeTruthy();
  });

  it("renders mobile menu button", () => {
    render(<Header />);
    expect(screen.getByLabelText("Toggle menu")).toBeTruthy();
  });
});
