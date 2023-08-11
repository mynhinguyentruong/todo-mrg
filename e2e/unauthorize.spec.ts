import { test, expect } from "@playwright/test";

test("has title and signin with github button for unauthenticated user", async ({
  page,
  context,
}) => {
  await page.goto("http://localhost:3000/");
  await context.clearCookies();

  await expect(page.locator("h1")).toContainText("Please sign in to continue");
  await expect(
    page.locator('button:has-text("Sign in with GitHub")')
  ).toBeVisible();
});
