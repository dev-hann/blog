import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("next/image", () => ({
  default: ({ src, alt, width, height }: { src: string; alt: string; width: number; height: number }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} width={width} height={height} />
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
});
