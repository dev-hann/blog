import React from "react";
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

describe("Not Found page", () => {
  it("renders 404 message", async () => {
    const { default: NotFound } = await import("@/app/not-found");
    render(<NotFound />);
    expect(screen.getByText("404")).toBeInTheDocument();
  });

  it("has role alert for screen readers", async () => {
    const { default: NotFound } = await import("@/app/not-found");
    const { container } = render(<NotFound />);
    expect(container.querySelector("[role='alert']")).toBeInTheDocument();
  });

  it("has link to home", async () => {
    const { default: NotFound } = await import("@/app/not-found");
    render(<NotFound />);
    const homeLinks = screen.getAllByRole("link", { name: /home/i }).filter((l) => l.getAttribute("href") === "/");
    expect(homeLinks.length).toBeGreaterThanOrEqual(1);
  });

  it("section has aria-labelledby pointing to heading", async () => {
    const { default: NotFound } = await import("@/app/not-found");
    const { container } = render(<NotFound />);
    const section = container.querySelector("[aria-labelledby]");
    expect(section).toBeInTheDocument();
    const labelledby = section!.getAttribute("aria-labelledby");
    const heading = container.querySelector(`#${labelledby}`);
    expect(heading).toBeInTheDocument();
  });
});
