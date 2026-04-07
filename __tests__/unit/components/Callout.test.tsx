import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
  useRouter: () => ({ push: vi.fn() }),
}));

describe("Callout", () => {
  it("renders children", async () => {
    const { default: Callout } = await import("@/components/mdx/Callout");
    render(<Callout>This is important</Callout>);
    expect(screen.getByText("This is important")).toBeInTheDocument();
  });

  it("defaults to info type", async () => {
    const { default: Callout } = await import("@/components/mdx/Callout");
    const { container } = render(<Callout>Info message</Callout>);
    const div = container.firstChild as HTMLElement;
    expect(div.className).toContain("color-info");
  });

  it("renders warning type", async () => {
    const { default: Callout } = await import("@/components/mdx/Callout");
    const { container } = render(<Callout type="warning">Warning</Callout>);
    const div = container.firstChild as HTMLElement;
    expect(div.className).toContain("color-warning");
  });

  it("renders danger type", async () => {
    const { default: Callout } = await import("@/components/mdx/Callout");
    const { container } = render(<Callout type="danger">Danger</Callout>);
    const div = container.firstChild as HTMLElement;
    expect(div.className).toContain("color-error");
  });

  it("has alert role", async () => {
    const { default: Callout } = await import("@/components/mdx/Callout");
    render(<Callout>Alert</Callout>);
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });
});
