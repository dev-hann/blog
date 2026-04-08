import React from "react";
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

  it("has accessible label for each type", async () => {
    const { default: Callout } = await import("@/components/mdx/Callout");
    render(<Callout type="warning">Watch out</Callout>);
    expect(screen.getByRole("status")).toHaveAttribute("aria-label", "Warning");
  });

  it("does not produce duplicate IDs across multiple instances", async () => {
    const { default: Callout } = await import("@/components/mdx/Callout");
    const { container } = render(
      <>
        <Callout type="info">First</Callout>
        <Callout type="info">Second</Callout>
      </>
    );
    const ids = Array.from(container.querySelectorAll("[id]")).map((el) => el.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it("does not use aria-labelledby (avoids duplicate ID issue)", async () => {
    const { default: Callout } = await import("@/components/mdx/Callout");
    render(<Callout>Check</Callout>);
    expect(screen.getByRole("note")).not.toHaveAttribute("aria-labelledby");
  });
});
