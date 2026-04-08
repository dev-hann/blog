import { render, screen } from "@testing-library/react";
import Skeleton from "@/components/ui/Skeleton";

describe("Skeleton", () => {
  it("renders with default className", () => {
    render(<Skeleton />);
    const skeleton = screen.getByRole("status", { hidden: true });
    expect(skeleton).toHaveClass("animate-pulse", "rounded", "bg-[var(--color-bg-tertiary)]");
  });

  it("renders with custom className", () => {
    render(<Skeleton className="w-full h-10" />);
    const skeleton = screen.getByRole("status", { hidden: true });
    expect(skeleton).toHaveClass("w-full", "h-10");
  });

  it("renders with custom width and height", () => {
    render(<Skeleton width="w-1/2" height="h-4" />);
    const skeleton = screen.getByRole("status", { hidden: true });
    expect(skeleton).toHaveClass("w-1/2", "h-4");
  });

  it("passes additional props to element", () => {
    render(<Skeleton data-testid="custom-skeleton" />);
    const skeleton = screen.getByTestId("custom-skeleton");
    expect(skeleton).toBeInTheDocument();
  });

  it("renders sr-only loading text for accessibility", () => {
    render(<Skeleton />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders with rounded-full variant", () => {
    render(<Skeleton variant="circle" />);
    const skeleton = screen.getByRole("status", { hidden: true });
    expect(skeleton).toHaveClass("rounded-full");
  });
});
