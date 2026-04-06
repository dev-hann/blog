import { describe, it, expect, vi } from "vitest";
import { GET } from "@/app/feed.xml/route";

vi.mock("@/lib/posts", () => ({
  getAllPosts: () => [
    {
      slug: "first-post",
      title: "첫 번째 포스트",
      date: "2026-04-06",
      tags: ["react"],
      summary: "첫 포스트 요약",
      draft: false,
    },
    {
      slug: "second-post",
      title: "두 번째 포스트",
      date: "2026-04-05",
      tags: ["nextjs"],
      summary: "두 번째 포스트 요약",
      draft: false,
    },
  ],
}));

describe("RSS feed", () => {
  it("returns XML response", async () => {
    const response = await GET();
    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toBe("application/xml");
  });

  it("contains RSS 2.0 declaration", async () => {
    const response = await GET();
    const text = await response.text();
    expect(text).toContain("<rss");
    expect(text).toContain('version="2.0"');
    expect(text).toContain("<channel>");
    expect(text).toContain("</channel>");
    expect(text).toContain("</rss>");
  });

  it("includes all posts as items", async () => {
    const response = await GET();
    const text = await response.text();
    expect(text).toContain("<item>");
    expect(text).toContain("<![CDATA[첫 번째 포스트]]>");
    expect(text).toContain("<![CDATA[두 번째 포스트]]>");
    expect(text).toContain("/posts/first-post</link>");
    expect(text).toContain("/posts/second-post</link>");
  });
});
