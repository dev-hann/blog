import { test, expect } from "@playwright/test";

test.describe("Responsive layout", () => {
  test("mobile layout at 375px", async ({ browser }) => {
    const context = await browser.newContext({ viewport: { width: 375, height: 667 } });
    const page = await context.newPage();

    await page.goto("/posts");
    const posts = page.locator('a[href^="/posts/"]');
    expect(await posts.count()).toBeGreaterThanOrEqual(1);

    await context.close();
  });

  test("tablet layout at 768px", async ({ browser }) => {
    const context = await browser.newContext({ viewport: { width: 768, height: 1024 } });
    const page = await context.newPage();

    await page.goto("/tags");
    await expect(page.locator("h1")).toContainText("Tags");

    await context.close();
  });

  test("desktop layout at 1280px", async ({ browser }) => {
    const context = await browser.newContext({ viewport: { width: 1280, height: 720 } });
    const page = await context.newPage();

    await page.goto("/posts");
    await expect(page.locator("h1")).toBeVisible();

    const desktopNav = page.locator("header nav.hidden");
    await expect(desktopNav).toBeVisible();

    await context.close();
  });

  test("mobile menu toggle works", async ({ browser }) => {
    const context = await browser.newContext({ viewport: { width: 375, height: 667 } });
    const page = await context.newPage();

    await page.goto("/posts");

    await expect(page.locator('header nav[class*="flex-col"]')).not.toBeVisible();

    await page.click('button[aria-label="Toggle menu"]');
    await expect(page.locator('header nav[class*="flex-col"]')).toBeVisible();

    await page.click('button[aria-label="Toggle menu"]');
    await expect(page.locator('header nav[class*="flex-col"]')).not.toBeVisible();

    await context.close();
  });
});
