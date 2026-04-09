import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Terminal from "@/components/terminal/Terminal";
import type { TerminalLine } from "@/lib/terminal/types";

const mockExecuteCommand = vi.fn();

vi.mock("@/lib/terminal/commands", () => ({
  executeCommand: () => mockExecuteCommand(),
}));

vi.mock("@/lib/constants", () => ({
  SITE_CONFIG: {
    name: "Test Blog",
    author: "Test Author",
  },
}));

vi.mock("@/lib/terminal/utils", () => ({
  genId: vi.fn(() => "mock-id"),
}));

beforeEach(() => {
  mockExecuteCommand.mockReset();
});

const mockPosts = [
  { slug: "post-1", title: "Post 1", date: "2026-04-01", tags: ["react"], summary: "Summary 1" },
  { slug: "post-2", title: "Post 2", date: "2026-04-02", tags: ["nextjs"], summary: "Summary 2" },
];

const mockTags = { react: 1, nextjs: 1 };

describe("Terminal", () => {
  beforeEach(() => {
    mockExecuteCommand.mockReset();
  });

  it("renders welcome message on mount", () => {
    render(<Terminal posts={mockPosts} tags={mockTags} />);
    expect(screen.getByText(/Welcome to Test Author's blog terminal/)).toBeInTheDocument();
  });

  it("renders input field", () => {
    render(<Terminal posts={mockPosts} tags={mockTags} />);
    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
  });

  it("executes command and displays output", async () => {
    const mockResult: { lines: TerminalLine[] } = {
      lines: [{ id: "mock-id", type: "output", content: "Command output" }],
    };
    mockExecuteCommand.mockResolvedValue(mockResult);

    render(<Terminal posts={mockPosts} tags={mockTags} />);
    const input = screen.getByRole("textbox");

    fireEvent.change(input, { target: { value: "test command" } });
    fireEvent.keyDown(input, { key: "Enter" });

    await waitFor(() => {
      expect(screen.getByText("Command output")).toBeInTheDocument();
    });
  });

  it("clears screen on clear command", async () => {
    const mockResult: { lines: TerminalLine[] } = {
      lines: [{ id: "mock-id", type: "output", content: "Output" }],
    };
    mockExecuteCommand.mockResolvedValue(mockResult);

    render(<Terminal posts={mockPosts} tags={mockTags} />);
    const input = screen.getByRole("textbox");

    fireEvent.change(input, { target: { value: "test" } });
    fireEvent.keyDown(input, { key: "Enter" });

    await waitFor(() => {
      expect(screen.getByText("Output")).toBeInTheDocument();
    });

    fireEvent.change(input, { target: { value: "clear" } });
    fireEvent.keyDown(input, { key: "Enter" });

    await waitFor(() => {
      expect(screen.queryByText("Output")).not.toBeInTheDocument();
    });
  });

  it("shows command history on arrow up", async () => {
    const mockResult: { lines: TerminalLine[] } = {
      lines: [{ id: "mock-id", type: "output", content: "" }],
    };
    mockExecuteCommand.mockResolvedValue(mockResult);

    render(<Terminal posts={mockPosts} tags={mockTags} />);
    const input = screen.getByRole("textbox");

    fireEvent.change(input, { target: { value: "command1" } });
    fireEvent.keyDown(input, { key: "Enter" });

    await waitFor(() => {
      expect((input as HTMLInputElement).value).toBe("");
    });

    fireEvent.change(input, { target: { value: "command2" } });
    fireEvent.keyDown(input, { key: "Enter" });

    await waitFor(() => {
      expect((input as HTMLInputElement).value).toBe("");
    });

    fireEvent.keyDown(input, { key: "ArrowUp" });

    expect((input as HTMLInputElement).value).toBe("command2");
  });

  it("has proper ARIA attributes for accessibility", () => {
    render(<Terminal posts={mockPosts} tags={mockTags} />);
    const terminalBody = screen.getByRole("log");
    expect(terminalBody).toHaveAttribute("aria-label", "Terminal output");
    expect(terminalBody).toHaveAttribute("aria-live", "polite");
  });
});
