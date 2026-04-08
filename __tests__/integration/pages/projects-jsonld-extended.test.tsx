import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, act } from "@testing-library/react";

vi.mock("next/link", () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

vi.mock("next/navigation", () => ({
  usePathname: () => "/projects",
}));

vi.mock("@/lib/constants", () => ({
  SITE_CONFIG: {
    name: "Blog",
    description: "Test description",
    author: "Test Author",
    url: "https://example.com",
    github: "https://github.com/test",
  },
}));

vi.mock("@/lib/posts", () => ({
  getAllPosts: () => [],
}));

describe("Projects Page - JSON-LD Extended", () => {
  beforeEach(() => {
    document.head.innerHTML = "";
  });

  it("includes ItemList schema with items", async () => {
    const { default: ProjectsPage } = await import("@/app/projects/page");
    await act(async () => {
      render(await ProjectsPage());
    });

    const scripts = document.querySelectorAll('script[type="application/ld+json"]');
    let itemListSchema = null;
    for (const script of scripts) {
      const jsonLd = JSON.parse(script.textContent || "{}");
      if (jsonLd["@type"] === "ItemList") {
        itemListSchema = jsonLd;
        break;
      }
    }

    expect(itemListSchema).not.toBeNull();
    expect(itemListSchema).toMatchObject({
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: expect.any(String),
      itemListElement: expect.any(Array),
    });
  });

  it("each project item has correct SoftwareApplication structure", async () => {
    const { default: ProjectsPage } = await import("@/app/projects/page");
    await act(async () => {
      render(await ProjectsPage());
    });

    const scripts = document.querySelectorAll('script[type="application/ld+json"]');
    let itemListSchema = null;
    for (const script of scripts) {
      const jsonLd = JSON.parse(script.textContent || "{}");
      if (jsonLd["@type"] === "ItemList") {
        itemListSchema = jsonLd;
        break;
      }
    }

    expect(itemListSchema).not.toBeNull();
    const firstItem = itemListSchema.itemListElement[0];
    expect(firstItem).toMatchObject({
      "@type": "ListItem",
      position: 1,
      item: {
        "@type": "SoftwareApplication",
        name: expect.any(String),
        description: expect.any(String),
      },
    });
  });

  it("includes CollectionPage schema", async () => {
    const { default: ProjectsPage } = await import("@/app/projects/page");
    await act(async () => {
      render(await ProjectsPage());
    });

    const scripts = document.querySelectorAll('script[type="application/ld+json"]');
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
