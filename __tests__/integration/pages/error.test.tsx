import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Global error boundary", () => {
  it("renders error message", async () => {
    const { default: ErrorPage } = await import("@/app/error");
    render(<ErrorPage error={new Error("Test error")} reset={() => {}} />);
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
  });

  it("renders try again button", async () => {
    const { default: ErrorPage } = await import("@/app/error");
    render(<ErrorPage error={new Error("Test error")} reset={() => {}} />);
    expect(
      screen.getByRole("button", { name: /try again/i })
    ).toBeInTheDocument();
  });

  it("calls reset when button clicked", async () => {
    const reset = vi.fn();
    const { default: ErrorPage } = await import("@/app/error");
    render(<ErrorPage error={new Error("Test error")} reset={reset} />);
    await userEvent.click(screen.getByRole("button", { name: /try again/i }));
    expect(reset).toHaveBeenCalledTimes(1);
  });
});
