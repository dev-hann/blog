import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("next/link", () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

vi.mock("next/navigation", () => ({
  notFound: () => {
    throw new Error("NOT_FOUND");
  },
  usePathname: () => "/",
  useRouter: () => ({ push: vi.fn() }),
  useSearchParams: () => ({ get: () => null }),
}));

vi.mock("@/lib/posts", () => ({
  getAllTags: () => ({ nextjs: 2, react: 1, typescript: 1 }),
  getAllPosts: () => [
    { slug: "post-1", title: "Next.js Post", date: "2026-04-06", tags: ["nextjs"], summary: "S1" },
    { slug: "post-2", title: "React Post", date: "2026-04-05", tags: ["react", "nextjs"], summary: "S2" },
    { slug: "post-3", title: "TS Post", date: "2026-04-04", tags: ["typescript"], summary: "S3" },
  ],
}));

describe("Tags list page", () => {
  it("renders all tags with counts", async () => {
    const { default: TagsPage } = await import("@/app/tags/page");
    render(<TagsPage />);
    expect(screen.getByRole("heading", { name: /tags/i, level: 1 })).toBeInTheDocument();
    expect(screen.getByText("nextjs")).toBeInTheDocument();
    expect(screen.getByText("react")).toBeInTheDocument();
    expect(screen.getByText("typescript")).toBeInTheDocument();
  });

  it("tags link to detail pages", async () => {
    const { default: TagsPage } = await import("@/app/tags/page");
    render(<TagsPage />);
    const tagLinks = screen.getAllByRole("link").filter((l) => l.getAttribute("href")?.startsWith("/tags/"));
    const hrefs = tagLinks.map((l) => l.getAttribute("href"));
    expect(hrefs).toContain("/tags/nextjs");
    expect(hrefs).toContain("/tags/react");
  });
});

describe("Tag detail page", () => {
  it("renders filtered posts for the tag", async () => {
    const { default: TagDetailPage } = await import("@/app/tags/[tag]/page");
    const params = Promise.resolve({ tag: "nextjs" });
    const result = await TagDetailPage({ params });
    render(result);
    expect(screen.getByText("#nextjs")).toBeInTheDocument();
    expect(screen.getByText("Next.js Post")).toBeInTheDocument();
    expect(screen.getByText("React Post")).toBeInTheDocument();
  });

  it("has aria-labelledby on section matching heading id", async () => {
    const { default: TagDetailPage } = await import("@/app/tags/[tag]/page");
    const params = Promise.resolve({ tag: "nextjs" });
    const result = await TagDetailPage({ params });
    const { container } = render(result);
    const heading = screen.getByRole("heading", { level: 1 });
    const headingId = heading.getAttribute("id");
    expect(headingId).toBeTruthy();
    const section = container.querySelector(`section[aria-labelledby="${headingId}"]`);
    expect(section).toBeInTheDocument();
  });

  it("calls notFound for non-existent tag", async () => {
    const { default: TagDetailPage } = await import("@/app/tags/[tag]/page");
    const params = Promise.resolve({ tag: "nonexistent" });
    await expect(TagDetailPage({ params })).rejects.toThrow("NOT_FOUND");
  });
});
