import { test as setup, expect } from '@playwright/test';

const authFile = 'playwright/.auth/user.json';

setup("authenticate", async ({ page }) => {

  await page.goto('http://localhost:3000/');  
  await page.getByRole('button', { name: 'Sign in with GitHub' }).click();
  await page.getByLabel('Username or email address').click();
  await page.getByLabel('Username or email address').fill('truongmynhi-nguyen');
  await page.getByLabel('Username or email address').press('Tab');
  await page.getByLabel('Password').fill('Apocalypse081');
  await page.getByRole('button', { name: 'Sign in' }).click();

  await page.getByRole('button', { name: /Authorize*/ }).click();

  await page.waitForURL('http://localhost:3000/')

  await expect(page.locator("h2")).toContainText("Boost your productivity.Start using task app today.");

  await page.context().storageState({ path: authFile });
})
