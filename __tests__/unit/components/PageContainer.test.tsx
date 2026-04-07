import { describe, it, expect } from "vitest";
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
});
