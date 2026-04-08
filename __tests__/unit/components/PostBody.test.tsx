import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("@/lib/mdx", () => ({
  renderMDX: (source: string) => <div data-testid="mdx-output">{source}</div>,
}));

describe("PostBody", () => {
  it("renders MDX content", async () => {
    const { default: PostBody } = await import("@/components/post/PostBody");
    render(<PostBody content="# Hello World" />);
    expect(screen.getByTestId("mdx-output")).toHaveTextContent("Hello World");
  });

  it("wraps content in mdx-content div", async () => {
    const { default: PostBody } = await import("@/components/post/PostBody");
    const { container } = render(<PostBody content="test" />);
    expect(container.querySelector(".mdx-content")).toBeInTheDocument();
  });

  it("passes content to renderMDX", async () => {
    const { default: PostBody } = await import("@/components/post/PostBody");
    render(<PostBody content="**bold text**" />);
    expect(screen.getByTestId("mdx-output")).toHaveTextContent("**bold text**");
  });
});
