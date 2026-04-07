import { test, expect } from "@playwright/test";

test.describe("Post reading flow", () => {
  test("navigate to post from posts list", async ({ page }) => {
    await page.goto("/posts");

    const firstPost = page.locator('a[href^="/posts/"]').first();
    await firstPost.click();

    await expect(page).toHaveURL(/\/posts\//);
    await expect(page.locator("article > header h1")).toBeVisible();
  });

  test("post detail renders MDX content", async ({ page }) => {
    await page.goto("/posts/nextjs-blog-guide");

    await expect(page.locator("article > header h1")).toContainText("Next.js 16으로 블로그 만들기");
    const contentElements = page.locator("article").locator("h2, h3, p");
    expect(await contentElements.count()).toBeGreaterThan(0);
  });

  test("navigate between posts via posts list", async ({ page }) => {
    await page.goto("/posts");

    const postLinks = page.locator('a[href^="/posts/"]');
    const count = await postLinks.count();
    expect(count).toBeGreaterThanOrEqual(2);

    await postLinks.first().click();
    await expect(page).toHaveURL(/\/posts\//);
    await expect(page.locator("article > header h1")).toBeVisible();

    await page.goBack();
    await expect(page).toHaveURL("/posts");

    await postLinks.nth(1).click();
    await expect(page).toHaveURL(/\/posts\//);
    await expect(page.locator("article > header h1")).toBeVisible();
  });

  test("comment section loads on post detail", async ({ page }) => {
    await page.goto("/posts/nextjs-blog-guide");

    await expect(page.locator('[data-comment-section]')).toBeVisible();
    await expect(page.locator('[data-comment-section] h2')).toContainText("댓글");
  });

  test("prev/next post navigation works", async ({ page }) => {
    await page.goto("/posts/nextjs-blog-guide");

    const prevNextNav = page.locator("article > nav");
    await expect(prevNextNav).toBeVisible();
  });
});
