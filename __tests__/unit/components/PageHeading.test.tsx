import { render, screen } from "@testing-library/react";
import PageHeading from "@/components/ui/PageHeading";

describe("PageHeading", () => {
  it("renders heading text", () => {
    render(<PageHeading>Test Heading</PageHeading>);
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
  });

  it("renders with correct className", () => {
    render(<PageHeading>Test Heading</PageHeading>);
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveClass("mb-8", "text-2xl", "font-bold", "text-[var(--color-text-primary)]");
  });

  it("passes additional props to heading element", () => {
    render(<PageHeading id="test-id">Test Heading</PageHeading>);
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveAttribute("id", "test-id");
  });

  it("renders children correctly", () => {
    render(<PageHeading>Test Heading</PageHeading>);
    expect(screen.getByText("Test Heading")).toBeInTheDocument();
  });
});
