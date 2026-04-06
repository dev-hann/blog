import { test, expect } from "@playwright/test";

test.describe("Navigation", () => {
  test("full navigation flow: home → posts → post detail → tags → projects → about", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("h1")).toContainText("Blog");

    await page.click('a[href="/posts"]:visible');
    await expect(page).toHaveURL("/posts");
    await expect(page.locator("h1")).toContainText("Posts");

    const firstPost = page.locator('a[href^="/posts/"]').first();
    await firstPost.click();
    await expect(page).toHaveURL(/\/posts\//);
    await expect(page.locator("article > header h1")).toBeVisible();

    await page.goto("/tags");
    await expect(page.locator("h1")).toContainText("Tags");

    await page.goto("/projects");
    await expect(page.locator("h1")).toContainText("Projects");

    await page.goto("/about");
    await expect(page.locator("h1")).toContainText("About");
  });

  test("header links navigate to correct pages (desktop)", async ({ page }) => {
    test.skip(page.viewportSize()?.width! < 768, "Desktop only");
    await page.goto("/");

    await page.click('header nav.hidden a[href="/posts"]');
    await expect(page).toHaveURL("/posts");

    await page.click('header nav.hidden a[href="/tags"]');
    await expect(page).toHaveURL("/tags");

    await page.click('header nav.hidden a[href="/projects"]');
    await expect(page).toHaveURL("/projects");

    await page.click('header nav.hidden a[href="/about"]');
    await expect(page).toHaveURL("/about");

    await page.click('header nav.hidden a[href="/search"]');
    await expect(page).toHaveURL("/search");

    await page.click('header nav.hidden a[href="/"]');
    await expect(page).toHaveURL("/");
  });
});

test("mobile hamburger opens menu and links work", async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 412, height: 915 } });
  const page = await context.newPage();

  await page.goto("/");

  await expect(page.locator('header nav[class*="flex-col"]')).not.toBeVisible();

  await page.click('button[aria-label="Toggle menu"]');
  await expect(page.locator('header nav[class*="flex-col"]')).toBeVisible();

  await page.click('header nav[class*="flex-col"] a[href="/posts"]');
  await expect(page).toHaveURL("/posts");

  await context.close();
});
