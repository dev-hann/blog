import { describe, it, expect } from "vitest";
import { generateJsonLd } from "@/lib/structured-data";

describe("generateJsonLd", () => {
  it("returns JSON-LD string for WebSite schema", () => {
    const result = generateJsonLd({
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Test Site",
      url: "https://example.com",
    });
    expect(result).toContain('"@context":"https://schema.org"');
    expect(result).toContain('"@type":"WebSite"');
    expect(result).toContain('"name":"Test Site"');
  });

  it("returns JSON-LD string for BlogPosting schema", () => {
    const result = generateJsonLd({
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: "Test Post",
      datePublished: "2026-04-08",
    });
    expect(result).toContain('"@type":"BlogPosting"');
    expect(result).toContain('"headline":"Test Post"');
    expect(result).toContain('"datePublished":"2026-04-08"');
  });

  it("returns JSON-LD string for CollectionPage schema", () => {
    const result = generateJsonLd({
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Tags",
      description: "Browse posts by tag",
    });
    expect(result).toContain('"@type":"CollectionPage"');
    expect(result).toContain('"name":"Tags"');
  });

  it("handles nested objects", () => {
    const result = generateJsonLd({
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      author: { "@type": "Person", name: "John Doe" },
    });
    expect(result).toContain('"author":{"@type":"Person","name":"John Doe"}');
  });

  it("handles arrays", () => {
    const result = generateJsonLd({
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      keywords: ["nextjs", "react", "typescript"],
    });
    expect(result).toContain('"keywords":["nextjs","react","typescript"]');
  });
});
