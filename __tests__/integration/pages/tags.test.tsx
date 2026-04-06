import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import TagsPage from "@/app/tags/page";
import TagDetailPage from "@/app/tags/[tag]/page";

vi.mock("next/link", () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

vi.mock("next/navigation", () => ({
  usePathname: () => "/tags",
  useRouter: () => ({ push: vi.fn() }),
  notFound: () => null,
}));

describe("TagsPage", () => {
  it("renders all tags with counts", () => {
    render(<TagsPage />);
    expect(screen.getByText("[nextjs]")).toBeTruthy();
    expect(screen.getByText("[react]")).toBeTruthy();
    expect(screen.getByText("[typescript]")).toBeTruthy();
    expect(screen.getByText("[javascript]")).toBeTruthy();
    expect(screen.getAllByText("(2)").length).toBe(2);
    expect(screen.getAllByText("(1)").length).toBe(2);
  });

  it("renders $ tags prompt", () => {
    render(<TagsPage />);
    expect(screen.getByText("tags")).toBeTruthy();
  });

  it("tag links to tag detail", () => {
    render(<TagsPage />);
    const links = screen.getAllByRole("link");
    const hrefs = links.map((l) => l.getAttribute("href"));
    expect(hrefs).toContain("/tags/nextjs");
    expect(hrefs).toContain("/tags/react");
    expect(hrefs).toContain("/tags/typescript");
    expect(hrefs).toContain("/tags/javascript");
  });
});

describe("TagDetailPage", () => {
  it("tag detail shows filtered posts with grep prompt", async () => {
    const page = await TagDetailPage({ params: Promise.resolve({ tag: "react" }) });
    render(page);
    expect(screen.getByText(/grep -r "react" ~\/posts/)).toBeTruthy();
    expect(screen.getByText("Next.js 16으로 블로그 만들기")).toBeTruthy();
    expect(screen.getByText("React 19 Server Components 실전 가이드")).toBeTruthy();
  });

  it("returns notFound for non-existent tag", async () => {
    const result = await TagDetailPage({ params: Promise.resolve({ tag: "nonexistent" }) });
    expect(result).toBeNull();
  });
});
