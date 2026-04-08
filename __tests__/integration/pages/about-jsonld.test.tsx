import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, act } from "@testing-library/react";

vi.mock("next/link", () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

vi.mock("next/navigation", () => ({
  usePathname: () => "/about",
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

describe("About page JSON-LD", () => {
  beforeEach(() => {
    document.head.innerHTML = "";
  });

  it("includes Person JSON-LD schema for author", async () => {
    const { default: AboutPage } = await import("@/app/about/page");
    await act(async () => {
      render(await AboutPage());
    });

    const scripts = document.querySelectorAll('script[type="application/ld+json"]');
    expect(scripts.length).toBeGreaterThan(0);

    let personSchema = null;
    for (const script of scripts) {
      const jsonLd = JSON.parse(script.textContent || "{}");
      if (jsonLd["@type"] === "Person") {
        personSchema = jsonLd;
        break;
      }
    }

    expect(personSchema).not.toBeNull();
    expect(personSchema).toMatchObject({
      "@context": "https://schema.org",
      "@type": "Person",
      name: expect.any(String),
      description: expect.any(String),
      url: expect.any(String),
    });
  });
});