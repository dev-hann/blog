import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, act } from "@testing-library/react";

vi.mock("next/link", () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

vi.mock("next/navigation", () => ({
  usePathname: () => "/search",
  useSearchParams: () => new URLSearchParams(),
  useRouter: () => ({ push: vi.fn() }),
}));

vi.mock("@/lib/posts", () => ({
  getAllPosts: () => [],
}));

describe("Search page JSON-LD", () => {
  beforeEach(() => {
    document.head.innerHTML = "";
  });

  it("includes CollectionPage JSON-LD schema", async () => {
    const { default: SearchPage } = await import("@/app/search/page");
    await act(async () => {
      render(await SearchPage());
    });

    const scripts = document.querySelectorAll('script[type="application/ld+json"]');
    expect(scripts.length).toBeGreaterThan(0);

    let collectionSchema = null;
    for (const script of scripts) {
      const jsonLd = JSON.parse(script.textContent || "{}");
      if (jsonLd["@type"] === "CollectionPage") {
        collectionSchema = jsonLd;
        break;
      }
    }

    expect(collectionSchema).not.toBeNull();
    expect(collectionSchema).toMatchObject({
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: expect.any(String),
      description: expect.any(String),
    });
  });
});
