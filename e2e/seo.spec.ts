import { test, expect } from "@playwright/test";

test.describe("SEO", () => {
  test("RSS feed is accessible", async ({ page }) => {
    const response = await page.goto("/feed.xml");
    expect(response!.status()).toBe(200);

    const contentType = response!.headers()["content-type"];
    expect(contentType).toContain("xml");

    const body = await page.textContent("body");
    expect(body).toContain("<rss");
    expect(body).toContain("<channel>");
    expect(body).toContain("<item>");
  });

  test("sitemap is accessible", async ({ page }) => {
    const response = await page.goto("/sitemap.xml");
    expect(response!.status()).toBe(200);

    const contentType = response!.headers()["content-type"];
    expect(contentType).toContain("xml");
  });

  test("robots.txt is accessible", async ({ page }) => {
    const response = await page.goto("/robots.txt");
    expect(response!.status()).toBe(200);
  });

  test("post page has correct title and meta", async ({ page }) => {
    await page.goto("/posts/nextjs-blog-guide");

    const title = await page.title();
    expect(title).toBeTruthy();
    expect(title).toContain("Blog");

    const metaDescription = await page.getAttribute('meta[name="description"]', "content");
    expect(metaDescription).toBeTruthy();
  });
});
