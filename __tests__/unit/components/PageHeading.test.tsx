import React from "react";
import { describe, it, expect, vi } from "vitest";
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

  describe("React.memo", () => {
    it("does not re-render when props remain the same", () => {
      const renderSpy = vi.fn(() => <span>Test</span>);
      const TestComponent = React.memo(renderSpy);

      const { rerender } = render(
        <PageHeading>
          <TestComponent />
        </PageHeading>
      );

      const initialCalls = renderSpy.mock.calls.length;
      rerender(
        <PageHeading>
          <TestComponent />
        </PageHeading>
      );

      expect(renderSpy.mock.calls.length).toBe(initialCalls);
    });

    it("re-renders when children change", () => {
      const { rerender } = render(<PageHeading>Old Heading</PageHeading>);
      expect(screen.getByText("Old Heading")).toBeInTheDocument();

      rerender(<PageHeading>New Heading</PageHeading>);
      expect(screen.getByText("New Heading")).toBeInTheDocument();
      expect(screen.queryByText("Old Heading")).not.toBeInTheDocument();
    });
  });
});
