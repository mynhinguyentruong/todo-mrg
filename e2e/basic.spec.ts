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
  // await page.getByRole('link', { name: 'New task' }).click();
  // await page.getByPlaceholder('New task').click();
  // await page.getByPlaceholder('New task').fill('Task 2');
  // await page.getByRole('button', { name: 'Done' }).click();
  // await page.getByText('0 completed').click();
  // await page.getByRole('button').nth(2).click();
  // await page.getByRole('link', { name: 'New task' }).click();
  // await page.getByPlaceholder('New task').click();
  // await page.getByPlaceholder('New task').fill('Task 3');
  // await page.getByRole('button', { name: 'Done' }).click();
  // await page.getByRole('button', { name: 'Task 1' }).click();
  // await page.getByText('Task completed').click();
  // await page.getByRole('status').click();
  // await page.locator('div').filter({ hasText: /^List name$/ }).getByRole('link').nth(1).click();
  // await page.getByPlaceholder('Enter list title').click();
  // await page.getByPlaceholder('Enter list title').fill('List haha');
  // await page.getByRole('button', { name: 'Done' }).click();
  // await page.getByRole('heading', { name: 'List haha' }).click();
  // await page.getByText('Create tasks, edit and more.').click();
  // await page.getByRole('button').nth(2).click();
  // await page.locator('li').filter({ hasText: 'Task 1' }).click();
  // await page.getByRole('button', { name: 'Task 1' }).click();
  // await page.getByRole('status').click();
  // await page.getByText('Task marked incompleted').click();
  // await page.getByLabel('Notifications alt+T').locator('path').click();
  // await page.locator('li').filter({ hasText: 'Task 1' }).getByRole('link').nth(1).click();
  // await page.getByPlaceholder('Enter list title').click();
  // await page.getByPlaceholder('Enter list title').fill('Task 1 edited');
  // await page.getByRole('button', { name: 'Done' }).click();
  // await page.locator('li').filter({ hasText: 'Task 2' }).getByRole('link').nth(1).click();
  // await page.getByPlaceholder('Enter list title').click();
  // await page.getByPlaceholder('Enter list title').fill('Task 2 edited');
  // await page.getByRole('button', { name: 'Done' }).click();
  // await page.locator('li').filter({ hasText: 'Task 3' }).getByRole('link').first().click();
  // await page.getByRole('heading', { name: 'Delete task' }).click();
  // await page.locator('div').filter({ hasText: 'Delete taskAre you sure you want to delete this task?DeleteCancel' }).nth(3).click();
  // await page.getByRole('link', { name: 'New task' }).click();
  // await page.getByPlaceholder('New task').click();
  // await page.getByPlaceholder('New task').fill('task 3');
  // await page.getByRole('button', { name: 'Done' }).click();
  // await page.locator('li').filter({ hasText: 'task 3' }).getByRole('link').first().click();
  // await page.getByText('Are you sure you want to delete this task?').click();
  // await page.getByRole('heading', { name: 'Delete task' }).click();
  // await page.getByRole('button', { name: 'Cancel' }).click();
  // await page.locator('li').filter({ hasText: 'task 3' }).getByRole('link').first().click();
  // await page.getByRole('button', { name: 'Delete' }).click();
  // await page.locator('div').filter({ hasText: /^List haha$/ }).locator('div').click();
  // await page.locator('li').filter({ hasText: 'Task 1 edited' }).locator('div').click();
  // await page.locator('div').filter({ hasText: /^List haha$/ }).getByRole('link').first().click();
  // await page.getByRole('button', { name: 'Delete' }).click();
  // await page.getByRole('heading', { name: 'Boost your productivity. Start using task app today.' }).click();
  // await page.getByRole('link', { name: 'Create a new list' }).click();
  // await page.getByPlaceholder('Enter list title').click();
  // await page.getByPlaceholder('Enter list title').fill('my list');
  // await page.getByRole('button', { name: 'Done' }).click();
  // await page.getByText('No task yetAdd your to-dos and keep track of them across Workspace.Create a new ').click();
  // await page.getByRole('heading', { name: 'No task yet' }).click();
  // await page.getByText('Add your to-dos and keep track of them across Workspace.').click();
  // await page.getByRole('link', { name: 'Create a new task' }).click();
  // await page.getByPlaceholder('New task').click();
  // await page.getByPlaceholder('New task').fill('new task 1');
  // await page.getByRole('button', { name: 'Done' }).click();
  // await page.getByRole('list').getByRole('link').nth(1).click();
  // await page.getByPlaceholder('Enter list title').click();
  // await page.getByPlaceholder('Enter list title').fill('new task 1 editied');
  // await page.getByRole('button', { name: 'Done' }).click();
  // await page.getByRole('link', { name: 'list', exact: true }).click();
});
