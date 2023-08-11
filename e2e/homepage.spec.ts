import { test, expect } from "@playwright/test";

test.use({ storageState: 'playwright/.auth/user.json' });

test("render homepage for authenticated user", async ({
  page 
}) => {

  await page.goto('http://localhost:3000/');  
  await expect(page.locator("h2")).toContainText("Boost your productivity.Start using task app today.");
  await expect(page.getByTestId('newlistbutton')).toContainText('Create a new list') 
})

test("able to create a new todo list from home page and render the correct todolist", async ({ page }) => {

  await page.goto('http://localhost:3000/');  
  await expect(page.getByTestId('newlistbutton')).toContainText('Create a new list') 
  await page.getByTestId('newlistbutton').click();
  await page.getByPlaceholder('Enter list title').fill('Example list title');
  await page.getByRole('button', { name: 'Done' }).click();

  await expect(page.getByRole('heading', { name: 'Example list title' })).toBeVisible();
  
  await expect(page.getByTestId("no-task-header")).toContainText("No task yet");
  await expect(page.getByTestId("no-task-paragraph")).toContainText("Add your to-dos and keep track of them across Workspace.");
  await expect(page.getByRole('link', { name: "Create a new task"})).toBeVisible()

  await expect(page.getByTestId("completed-todo")).toContainText("0 completed");
})
