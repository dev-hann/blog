import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

vi.mock("next/image", () => ({
  default: ({ src, alt, width, height, sizes, priority, onError }: { src: string; alt: string; width: number; height: number; sizes?: string; priority?: boolean; onError?: () => void }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} width={width} height={height} data-sizes={sizes} data-priority={priority ? "true" : undefined} onError={onError} />
  ),
}));

describe("MDXImage", () => {
  it("renders image with src and alt", async () => {
    const { default: MDXImage } = await import("@/components/mdx/Image");
    render(<MDXImage src="/test.png" alt="Test image" />);
    expect(screen.getByRole("img")).toHaveAttribute("src", "/test.png");
    expect(screen.getByRole("img")).toHaveAttribute("alt", "Test image");
  });

  it("renders nothing when src is missing", async () => {
    const { default: MDXImage } = await import("@/components/mdx/Image");
    const { container } = render(<MDXImage alt="No image" />);
    expect(container.querySelector("figure")).toBeNull();
  });

  it("renders caption when provided", async () => {
    const { default: MDXImage } = await import("@/components/mdx/Image");
    render(<MDXImage src="/test.png" alt="Captioned" caption="A caption" />);
    expect(screen.getByText("A caption")).toBeInTheDocument();
  });

  it("does not render figcaption without caption", async () => {
    const { default: MDXImage } = await import("@/components/mdx/Image");
    const { container } = render(<MDXImage src="/test.png" alt="No caption" />);
    expect(container.querySelector("figcaption")).toBeNull();
  });

  it("uses default width and height when not provided", async () => {
    const { default: MDXImage } = await import("@/components/mdx/Image");
    render(<MDXImage src="/test.png" alt="Defaults" />);
    expect(screen.getByRole("img")).toHaveAttribute("width", "800");
    expect(screen.getByRole("img")).toHaveAttribute("height", "450");
  });

  it("wraps image in figure element", async () => {
    const { default: MDXImage } = await import("@/components/mdx/Image");
    const { container } = render(<MDXImage src="/test.png" alt="Figure test" />);
    expect(container.querySelector("figure")).toBeInTheDocument();
    expect(container.querySelector("figure")?.querySelector("img")).toBeInTheDocument();
  });

  it("passes sizes attribute for responsive optimization", async () => {
    const { default: MDXImage } = await import("@/components/mdx/Image");
    render(<MDXImage src="/test.png" alt="Sized" />);
    expect(screen.getByRole("img")).toHaveAttribute("data-sizes", "100vw");
  });

  it("passes priority prop to next/image when provided", async () => {
    const { default: MDXImage } = await import("@/components/mdx/Image");
    render(<MDXImage src="/hero.png" alt="Hero" priority />);
    expect(screen.getByRole("img")).toHaveAttribute("data-priority", "true");
  });

  it("does not set priority by default", async () => {
    const { default: MDXImage } = await import("@/components/mdx/Image");
    render(<MDXImage src="/test.png" alt="Normal" />);
    expect(screen.getByRole("img")).not.toHaveAttribute("data-priority");
  });

  it("shows alt text fallback when image fails to load", async () => {
    const { default: MDXImage } = await import("@/components/mdx/Image");
    const { container } = render(<MDXImage src="/broken.png" alt="Broken image" />);
    const img = screen.getByRole("img");
    await fireEvent.error(img);
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
    expect(container.querySelector("[data-img-error]")).toBeInTheDocument();
    expect(container.textContent).toContain("Broken image");
  });
});
