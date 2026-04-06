import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import Meta from "@/components/seo/Meta";

vi.mock("next/link", () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

describe("Meta", () => {
  it("renders OG title", () => {
    render(<Meta title="테스트 제목" description="테스트 설명" path="/test" />);
    const ogTitle = document.querySelector('meta[property="og:title"]');
    expect(ogTitle).toBeTruthy();
    expect(ogTitle?.getAttribute("content")).toBe("테스트 제목");
  });

  it("renders OG description", () => {
    render(<Meta title="테스트 제목" description="테스트 설명" path="/test" />);
    const ogDesc = document.querySelector('meta[property="og:description"]');
    expect(ogDesc).toBeTruthy();
    expect(ogDesc?.getAttribute("content")).toBe("테스트 설명");
  });

  it("renders canonical URL", () => {
    render(<Meta title="테스트 제목" description="테스트 설명" path="/test" />);
    const canonical = document.querySelector('link[rel="canonical"]');
    expect(canonical).toBeTruthy();
    expect(canonical?.getAttribute("href")).toBe("https://blog.dev/test");
  });
});
