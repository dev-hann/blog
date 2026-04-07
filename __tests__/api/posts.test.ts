import { describe, it, expect, vi, beforeEach } from "vitest";

function createMockRequest(): Request {
  return new Request("http://localhost/api/posts/test-slug");
}

describe("GET /api/posts/[slug]", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.restoreAllMocks();
  });

  it("returns 200 with post data for valid slug", async () => {
    const mockPost = {
      slug: "nextjs-blog-guide",
      title: "Next.js 16으로 블로그 만들기",
      date: "2026-04-06",
      tags: ["nextjs", "react"],
      summary: "Next.js 16 App Router를 활용하여 개인 블로그를 구축하는 과정을 정리합니다.",
      content: "## 시작하며\n\n테스트 콘텐츠입니다.",
    };

    vi.doMock("@/lib/posts", () => ({
      getPostBySlug: () => mockPost,
    }));

    const { GET } = await import("@/app/api/posts/[slug]/route");
    const req = createMockRequest();
    const params = Promise.resolve({ slug: "nextjs-blog-guide" });
    const res = await GET(req, { params });
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.slug).toBe("nextjs-blog-guide");
    expect(data.title).toBe("Next.js 16으로 블로그 만들기");
    expect(data.html).toBeDefined();
  });

  it("returns 404 for non-existent slug", async () => {
    vi.doMock("@/lib/posts", () => ({
      getPostBySlug: () => {
        throw new Error("Post not found: non-existent");
      },
    }));

    const { GET } = await import("@/app/api/posts/[slug]/route");
    const req = createMockRequest();
    const params = Promise.resolve({ slug: "non-existent" });
    const res = await GET(req, { params });
    const data = await res.json();

    expect(res.status).toBe(404);
    expect(data.error).toBe("Post not found");
  });
});
