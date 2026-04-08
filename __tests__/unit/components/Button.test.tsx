import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "@/components/ui/Button";

describe("Button", () => {
  it("renders button text", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button")).toHaveTextContent("Click me");
  });

  it("renders with primary variant className", () => {
    render(<Button variant="primary">Primary</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass(
      "rounded",
      "bg-[var(--color-accent)]",
      "px-6",
      "py-2",
      "text-sm",
      "text-[var(--color-bg-primary)]",
      "transition-colors",
      "hover:bg-[var(--color-accent-hover)]"
    );
  });

  it("renders with outline variant className", () => {
    render(<Button variant="outline">Outline</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass(
      "rounded",
      "border",
      "border-[var(--color-border)]",
      "px-6",
      "py-2",
      "text-sm",
      "text-[var(--color-text-muted)]",
      "transition-colors",
      "hover:border-[var(--color-accent)]",
      "hover:text-[var(--color-text-accent)]"
    );
  });

  it("calls onClick when clicked", async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();
    render(<Button onClick={handleClick}>Click me</Button>);
    await user.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("is disabled when disabled prop is true", () => {
    render(<Button disabled>Disabled</Button>);
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
  });

  it("passes additional props to button element", () => {
    render(<Button type="submit">Submit</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("type", "submit");
  });

  it("renders children correctly", () => {
    render(<Button><span>Button Text</span></Button>);
    expect(screen.getByText("Button Text")).toBeInTheDocument();
  });
});
