import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

vi.mock("@/lib/terminal/commands", () => ({
  COMMAND_LIST: ["help", "ls", "cat", "tags", "about", "projects", "skills", "clear", "date", "whoami"],
  getCompletions: (input: string, _cmds: string[], slugs: string[]) => {
    const cmd = input.trim();
    const parts = cmd.split(/\s+/);
    if (parts.length === 1) {
      return ["help", "ls", "cat"].filter((c) => c.startsWith(cmd));
    }
    if (parts[0] === "cat" && parts.length === 2) {
      return slugs.filter((s) => s.startsWith(parts[1]));
    }
    return [];
  },
}));

const defaultProps = {
  onSubmit: vi.fn(),
  history: ["help", "ls"],
  historyIndex: -1,
  onHistoryUp: vi.fn(),
  onHistoryDown: vi.fn(),
  onShowCompletions: vi.fn(),
  slugs: ["my-post", "another-post"],
  tagNames: ["nextjs", "react"],
};

describe("CommandInput", () => {
  it("renders input with prompt", async () => {
    const { default: CommandInput } = await import("@/components/terminal/CommandInput");
    render(<CommandInput {...defaultProps} />);
    expect(screen.getByLabelText("Terminal command input")).toBeInTheDocument();
  });

  it("displays prompt symbol", async () => {
    const { default: CommandInput } = await import("@/components/terminal/CommandInput");
    render(<CommandInput {...defaultProps} />);
    expect(screen.getByText(/\$/)).toBeInTheDocument();
  });

  it("calls onSubmit on Enter", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    const { default: CommandInput } = await import("@/components/terminal/CommandInput");
    render(<CommandInput {...defaultProps} onSubmit={onSubmit} />);
    const input = screen.getByLabelText("Terminal command input");
    await user.type(input, "help{Enter}");
    expect(onSubmit).toHaveBeenCalledWith("help");
  });

  it("calls onHistoryUp on ArrowUp", async () => {
    const user = userEvent.setup();
    const onHistoryUp = vi.fn();
    const { default: CommandInput } = await import("@/components/terminal/CommandInput");
    render(<CommandInput {...defaultProps} onHistoryUp={onHistoryUp} />);
    const input = screen.getByLabelText("Terminal command input");
    await user.type(input, "{ArrowUp}");
    expect(onHistoryUp).toHaveBeenCalled();
  });

  it("calls onHistoryDown on ArrowDown", async () => {
    const user = userEvent.setup();
    const onHistoryDown = vi.fn();
    const { default: CommandInput } = await import("@/components/terminal/CommandInput");
    render(<CommandInput {...defaultProps} onHistoryDown={onHistoryDown} />);
    const input = screen.getByLabelText("Terminal command input");
    await user.type(input, "{ArrowDown}");
    expect(onHistoryDown).toHaveBeenCalled();
  });

  it("shows history entry when historyIndex >= 0", async () => {
    const { default: CommandInput } = await import("@/components/terminal/CommandInput");
    render(<CommandInput {...defaultProps} historyIndex={0} />);
    const input = screen.getByLabelText("Terminal command input") as HTMLInputElement;
    expect(input.value).toBe("ls");
  });

  it("shows typed input when historyIndex is -1", async () => {
    const user = userEvent.setup();
    const { default: CommandInput } = await import("@/components/terminal/CommandInput");
    render(<CommandInput {...defaultProps} />);
    const input = screen.getByLabelText("Terminal command input") as HTMLInputElement;
    await user.type(input, "ca");
    expect(input.value).toBe("ca");
  });

  it("can be disabled", async () => {
    const { default: CommandInput } = await import("@/components/terminal/CommandInput");
    render(<CommandInput {...defaultProps} disabled />);
    const input = screen.getByLabelText("Terminal command input") as HTMLInputElement;
    expect(input).toBeDisabled();
  });
});
