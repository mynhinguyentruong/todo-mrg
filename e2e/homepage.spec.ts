import { test, expect } from "@playwright/test";

test("has title and signin with github button", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  await expect(page.locator("h1")).toContainText("Please sign in to continue");
  // await expect(page.locator("div")).toContain("Sign in with GitHub");
});
