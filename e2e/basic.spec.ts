import { test, expect } from '@playwright/test';

test.use({ storageState: 'playwright/.auth/user.json' });

test('user able to create new list from clicking button on navbar, create new task and mark it as completed', async ({ page }) => {
  await page.goto('http://localhost:3000/')
  await page.getByRole('link', { name: 'New list', exact: true }).click()
  await page.getByPlaceholder('Enter list title').fill('List name');
  await page.getByRole('button', { name: 'Done' }).click();
  await page.getByTestId('newtask-button').click()
// getByRole('link', { name: 'New task' })
  await page.getByPlaceholder('New task').fill('Task 1');
  await page.getByRole('button', { name: 'Done' }).click();
  await expect(page.locator('li').first()).toContainText('Task 1')
  
  await page.getByRole('link', { name: 'New task', exact: true}).click()
  await page.getByPlaceholder('New task').fill('Task 2');
  await page.getByRole('button', { name: 'Done' }).click();
  await expect(page.locator('li').filter({ hasText: 'Task 2' })).toBeVisible();

  await page.getByRole('link', { name: 'New task', exact: true}).click()
  await page.getByPlaceholder('New task').fill('Task 3');
  await page.getByRole('button', { name: 'Done' }).click();
  await expect(page.locator('li').filter({ hasText: 'Task 3' })).toBeVisible();

  await page.getByRole('button', { name: 'Task 1', exact: true }).click()
  await expect(page.locator('li').filter({ hasText: 'Task 1' })).toBeHidden();
  await expect(page.getByText('Task completed', { exact: true})).toBeVisible()
});
