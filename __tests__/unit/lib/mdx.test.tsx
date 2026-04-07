import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("next-mdx-remote/rsc", () => ({
  MDXRemote: ({ source, components }: { source: string; components: Record<string, React.ComponentType> }) => (
    <div data-testid="mdx-remote" data-source={source}>
      {Object.keys(components).map((key) => (
        <span key={key} data-testid={`component-${key}`} />
      ))}
    </div>
  ),
}));

vi.mock("@/lib/mdx-plugins", () => ({
  rehypePlugins: [],
}));

describe("renderMDX component map", () => {
  it("includes CustomLink for 'a' tag", async () => {
    const { renderMDX } = await import("@/lib/mdx");
    render(renderMDX("test"));
    expect(screen.getByTestId("component-a")).toBeInTheDocument();
  });

  it("includes Pre for 'pre' tag", async () => {
    const { renderMDX } = await import("@/lib/mdx");
    render(renderMDX("test"));
    expect(screen.getByTestId("component-pre")).toBeInTheDocument();
  });

  it("includes Callout component", async () => {
    const { renderMDX } = await import("@/lib/mdx");
    render(renderMDX("test"));
    expect(screen.getByTestId("component-Callout")).toBeInTheDocument();
  });

  it("includes Image component", async () => {
    const { renderMDX } = await import("@/lib/mdx");
    render(renderMDX("test"));
    expect(screen.getByTestId("component-Image")).toBeInTheDocument();
  });

  it("includes img fallback component", async () => {
    const { renderMDX } = await import("@/lib/mdx");
    render(renderMDX("test"));
    expect(screen.getByTestId("component-img")).toBeInTheDocument();
  });

  it("passes source to MDXRemote", async () => {
    const { renderMDX } = await import("@/lib/mdx");
    render(renderMDX("# Hello"));
    expect(screen.getByTestId("mdx-remote")).toHaveAttribute("data-source", "# Hello");
  });
});
