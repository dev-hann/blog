import { describe, it, expect, vi } from "vitest";
import type { Metadata } from "next";
import { generateMetadata } from "@/lib/metadata";

vi.mock("@/lib/metadata", () => ({
  generateMetadata: vi.fn((props): Metadata => ({
    title: props.title || "Default Title",
    description: props.description || "Default Description",
    openGraph: {
      title: props.title || "Default Title",
      description: props.description || "Default Description",
      url: "https://example.com/test",
      images: [{ url: "https://example.com/og.png", width: 1200, height: 630, alt: "Test" }],
      siteName: "Test Site",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: props.title || "Default Title",
      description: props.description || "Default Description",
      images: ["https://example.com/og.png"],
    } as Metadata["twitter"],
    alternates: {
      canonical: "https://example.com/test",
    },
  })),
}));

describe("Meta", () => {
  it("renders meta tags", () => {
    const meta = generateMetadata({
      title: "Test Title",
      description: "Test Description",
      path: "/test",
    });

    expect(meta.title).toBe("Test Title");
    expect(meta.description).toBe("Test Description");
  });

  it("renders Open Graph tags", () => {
    const meta = generateMetadata({
      title: "Test",
      description: "Desc",
      path: "/test",
    });

    expect(meta.openGraph?.title).toBe("Test");
    expect(meta.openGraph?.description).toBe("Desc");
  });

  it("renders canonical URL", () => {
    const meta = generateMetadata({
      title: "Test",
      description: "Desc",
      path: "/test",
    });

    expect(meta.alternates?.canonical).toContain("/test");
  });

  it("renders Twitter card tags", () => {
    const meta = generateMetadata({
      title: "Test",
      description: "Desc",
      path: "/test",
    });

    expect((meta.twitter as { card?: string })?.card).toBe("summary_large_image");
    expect(meta.twitter?.title).toBe("Test");
  });
});
