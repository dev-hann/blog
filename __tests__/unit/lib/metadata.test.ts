import { describe, it, expect } from "vitest";
import { generateMetadata } from "@/lib/metadata";

describe("generateMetadata", () => {
  it("generates Open Graph metadata", () => {
    const meta = generateMetadata({ title: "Test Page", description: "Test description", path: "/test" });
    const openGraph = meta.openGraph as Record<string, string>;
    expect(openGraph?.title).toBe("Test Page");
    expect(openGraph?.description).toBe("Test description");
  });

  it("generates canonical URL via alternates", () => {
    const meta = generateMetadata({ title: "Test", description: "Desc", path: "/test" });
    const alternates = meta.alternates as { canonical: string };
    expect(alternates.canonical).toContain("/test");
  });

  it("generates Twitter card metadata", () => {
    const meta = generateMetadata({ title: "Test", description: "Desc", path: "/test" });
    const twitter = meta.twitter as Record<string, string>;
    expect(twitter?.card).toBe("summary_large_image");
    expect(twitter?.title).toBe("Test");
  });

  it("includes og:image when provided", () => {
    const meta = generateMetadata({ title: "Test", description: "Desc", path: "/test", image: "/og.png" });
    const openGraph = meta.openGraph as Record<string, string>;
    expect(openGraph?.images).toBe("/og.png");
  });

  it("includes robots metadata for indexing", () => {
    const meta = generateMetadata({ title: "Test", description: "Desc", path: "/test" });
    const robots = meta.robots as Record<string, unknown>;
    expect(robots?.index).toBe(true);
    expect(robots?.follow).toBe(true);
  });
});
