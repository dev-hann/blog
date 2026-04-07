import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

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

  it("danger type has alert role", async () => {
    const { default: Callout } = await import("@/components/mdx/Callout");
    render(<Callout type="danger">Danger alert</Callout>);
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("info type has note role", async () => {
    const { default: Callout } = await import("@/components/mdx/Callout");
    render(<Callout>Info note</Callout>);
    expect(screen.getByRole("note")).toBeInTheDocument();
  });

  it("warning type has status role", async () => {
    const { default: Callout } = await import("@/components/mdx/Callout");
    render(<Callout type="warning">Warning status</Callout>);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });
});
