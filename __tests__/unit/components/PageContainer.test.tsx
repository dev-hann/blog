import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import PageContainer from "@/components/ui/PageContainer";

describe("PageContainer", () => {
  it("renders children", () => {
    render(<PageContainer>Content</PageContainer>);
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("applies default page wrapper classes", () => {
    const { container } = render(<PageContainer>Test</PageContainer>);
    const div = container.firstElementChild as HTMLElement;
    expect(div.className).toContain("bg-[var(--color-bg-primary)]");
    expect(div.className).toContain("px-4");
    expect(div.className).toContain("py-8");
  });

  it("merges additional className", () => {
    const { container } = render(<PageContainer className="extra-class">Test</PageContainer>);
    const div = container.firstElementChild as HTMLElement;
    expect(div.className).toContain("extra-class");
    expect(div.className).toContain("py-8");
  });

  it("uses custom maxWidth prop", () => {
    const { container } = render(<PageContainer maxWidth="max-w-5xl">Test</PageContainer>);
    const inner = container.querySelector(".max-w-5xl");
    expect(inner).toBeInTheDocument();
  });

  it("defaults to max-w-3xl", () => {
    const { container } = render(<PageContainer>Test</PageContainer>);
    const inner = container.querySelector(".max-w-3xl");
    expect(inner).toBeInTheDocument();
  });

  describe("React.memo", () => {
    it("does not re-render when props remain the same", () => {
      const renderSpy = vi.fn(() => <div>Test</div>);
      const TestComponent = React.memo(renderSpy);

      const { rerender } = render(
        <PageContainer>
          <TestComponent />
        </PageContainer>
      );

      const initialCalls = renderSpy.mock.calls.length;
      rerender(
        <PageContainer>
          <TestComponent />
        </PageContainer>
      );

      expect(renderSpy.mock.calls.length).toBe(initialCalls);
    });

    it("re-renders when className prop changes", () => {
      const { container, rerender } = render(<PageContainer className="class1">Test</PageContainer>);
      const div = container.firstElementChild as HTMLElement;

      rerender(<PageContainer className="class2">Test</PageContainer>);

      expect(div.className).toContain("class2");
      expect(div.className).not.toContain("class1");
    });
  });
});
