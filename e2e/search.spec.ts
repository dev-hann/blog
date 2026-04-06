import { test, expect } from "@playwright/test";

test.describe("Search", () => {
  test("search and find posts", async ({ page }) => {
    await page.goto("/search");

    const input = page.locator('input[type="text"]');
    await input.fill("Next.js");

    await page.waitForTimeout(500);

    const results = page.locator('a[href^="/posts/"]');
    expect(await results.count()).toBeGreaterThanOrEqual(1);

    await results.first().click();
    await expect(page.locator("article")).toBeVisible();
  });

  test("search with no results", async ({ page }) => {
    await page.goto("/search");

    const input = page.locator('input[type="text"]');
    await input.fill("zzznonexistentpost12345");

    await page.waitForTimeout(500);

    await expect(page.locator("text=검색 결과가 없습니다")).toBeVisible();
  });

  test("empty query shows no results section", async ({ page }) => {
    await page.goto("/search");

    const input = page.locator('input[type="text"]');
    await input.fill("");

    await expect(page.locator('a[href^="/posts/"]')).toHaveCount(0);
  });

  test("search by tag", async ({ page }) => {
    await page.goto("/search");

    const input = page.locator('input[type="text"]');
    await input.fill("typescript");

    await page.waitForTimeout(500);

    const results = page.locator('a[href^="/posts/"]');
    expect(await results.count()).toBeGreaterThanOrEqual(1);
  });
});
