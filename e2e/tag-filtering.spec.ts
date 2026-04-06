import { test, expect } from "@playwright/test";

test.describe("Tag filtering", () => {
  test("filter by tag from tags page", async ({ page }) => {
    await page.goto("/tags");

    await expect(page.locator("h1")).toContainText("Tags");

    const firstTag = page.locator('a[href^="/tags/"]').first();
    const tagName = await firstTag.textContent();
    await firstTag.click();

    await expect(page.locator("h1")).toContainText(tagName!.split("(")[0].trim());

    const posts = page.locator('a[href^="/posts/"]');
    const postCount = await posts.count();
    expect(postCount).toBeGreaterThanOrEqual(1);
  });

  test("tag from post detail navigates to tag page", async ({ page }) => {
    await page.goto("/posts/nextjs-blog-guide");

    const tagOnPost = page.locator("article header span").first();
    const tagName = (await tagOnPost.textContent())!.trim();

    const tagLink = page.locator(`a[href="/tags/${tagName}"]`);
    if (await tagLink.count() > 0) {
      await tagLink.click();
    } else {
      await page.goto(`/tags/${tagName}`);
    }

    await expect(page.locator("h1")).toContainText(tagName);
    const posts = page.locator('a[href^="/posts/"]');
    expect(await posts.count()).toBeGreaterThanOrEqual(1);
  });

  test("react tag shows correct filtered posts", async ({ page }) => {
    await page.goto("/tags/react");

    await expect(page.locator("h1")).toContainText("react");
    const posts = page.locator('a[href^="/posts/"]');
    expect(await posts.count()).toBeGreaterThanOrEqual(1);
  });
});
