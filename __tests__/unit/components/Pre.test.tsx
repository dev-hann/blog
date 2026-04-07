import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const writeText = vi.fn().mockResolvedValue(undefined);

beforeEach(() => {
  vi.stubGlobal("navigator", {
    clipboard: { writeText },
  });
  writeText.mockClear();
});

describe("Pre", () => {
  it("renders code content", async () => {
    const { default: Pre } = await import("@/components/mdx/Pre");
    render(<Pre>{`console.log("hello")`}</Pre>);
    expect(screen.getByText(/console\.log/)).toBeInTheDocument();
  });

  it("has copy button", async () => {
    const { default: Pre } = await import("@/components/mdx/Pre");
    render(<Pre>some code</Pre>);
    expect(screen.getByRole("button", { name: /copy/i })).toBeInTheDocument();
  });

  it("shows Copied after click", async () => {
    const user = userEvent.setup();
    const { default: Pre } = await import("@/components/mdx/Pre");
    render(<Pre>test code block</Pre>);
    await user.click(screen.getByRole("button", { name: /copy/i }));
    expect(screen.getByText("Copied")).toBeInTheDocument();
  });
});
