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

  it("shows language label when code element has language class", async () => {
    const { default: Pre } = await import("@/components/mdx/Pre");
    render(
      <Pre>
        <code className="language-typescript">{"const x: number = 1"}</code>
      </Pre>
    );
    expect(screen.getByText("typescript")).toBeInTheDocument();
  });

  it("hides language label when no language class", async () => {
    const { default: Pre } = await import("@/components/mdx/Pre");
    render(<Pre>{"plain code"}</Pre>);
    expect(screen.queryByText("typescript")).not.toBeInTheDocument();
    expect(screen.queryByText("javascript")).not.toBeInTheDocument();
  });

  it("copy button is visible on keyboard focus via focus-visible class", async () => {
    const { default: Pre } = await import("@/components/mdx/Pre");
    render(<Pre>focusable code</Pre>);
    const btn = screen.getByRole("button", { name: /copy/i });
    expect(btn.className).toContain("focus-visible:opacity-100");
  });

  it("passes standard HTML attributes to pre element", async () => {
    const { default: Pre } = await import("@/components/mdx/Pre");
    const { container } = render(<Pre data-testid="code-block">test</Pre>);
    expect(container.querySelector("[data-testid='code-block']")).toBeInTheDocument();
  });

  it("language label has sr-only text for screen readers", async () => {
    const { default: Pre } = await import("@/components/mdx/Pre");
    render(
      <Pre>
        <code className="language-python">{"print('hello')"}</code>
      </Pre>
    );
    expect(screen.getByText("python")).toBeInTheDocument();
    const srLabel = screen.getByText("python").closest("span");
    expect(srLabel).toHaveAttribute("aria-label", "Language: python");
  });
});
