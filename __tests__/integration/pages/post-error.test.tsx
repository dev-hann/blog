import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Post detail error boundary", () => {
  it("renders error heading", async () => {
    const { default: PostError } = await import("@/app/posts/[slug]/error");
    render(<PostError error={new Error("MDX render failed")} reset={() => {}} />);
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
  });

  it("displays error message", async () => {
    const { default: PostError } = await import("@/app/posts/[slug]/error");
    render(<PostError error={new Error("MDX render failed")} reset={() => {}} />);
    expect(screen.getByText(/mdx render failed/i)).toBeInTheDocument();
  });

  it("renders try again button", async () => {
    const { default: PostError } = await import("@/app/posts/[slug]/error");
    render(<PostError error={new Error("MDX render failed")} reset={() => {}} />);
    expect(
      screen.getByRole("button", { name: /try again/i })
    ).toBeInTheDocument();
  });

  it("renders back to posts link", async () => {
    const { default: PostError } = await import("@/app/posts/[slug]/error");
    render(<PostError error={new Error("MDX render failed")} reset={() => {}} />);
    expect(
      screen.getByRole("link", { name: /back to posts/i })
    ).toHaveAttribute("href", "/posts");
  });

  it("calls reset when button clicked", async () => {
    const reset = vi.fn();
    const { default: PostError } = await import("@/app/posts/[slug]/error");
    render(<PostError error={new Error("MDX render failed")} reset={reset} />);
    await userEvent.click(screen.getByRole("button", { name: /try again/i }));
    expect(reset).toHaveBeenCalledTimes(1);
  });
});
