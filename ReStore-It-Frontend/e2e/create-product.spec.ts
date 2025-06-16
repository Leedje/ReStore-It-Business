import { test, expect } from '@playwright/test';

test('The created product should be accessible with the correct information', async ({ page }) => {
  await page.goto('http://localhost:4300/business/login');

  // Sign in
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('business@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('business');
  await page.getByRole('button', { name: 'Sign in' }).click();

  // Create product
  await page.getByText('Add Product').click();
  await page.getByRole('textbox', { name: 'Name' }).click();
  await page.getByRole('textbox', { name: 'Name' }).fill('Business Product');
  await page.getByRole('textbox', { name: 'Description' }).click();
  await page.getByRole('textbox', { name: 'Description' }).fill('Product description');
  await page.getByRole('textbox', { name: 'Size' }).click();
  await page.getByRole('textbox', { name: 'Size' }).fill('medium');
  await page.getByText('Select categories...').click();
  await page.getByLabel('Categories').selectOption('Sportswear');
  await page.getByLabel('Categories').selectOption('Boys');
  await page.getByRole('spinbutton', { name: 'Price' }).click();
  await page.getByRole('spinbutton', { name: 'Price' }).fill('21.87');

  const backendResponse = page.waitForResponse((response) =>
    response.url().includes('http://localhost:8080/products/create') && response.status() === 201
  );

  await page.getByRole('button', { name: 'Create' }).click();

  const response = await backendResponse;
  await expect(response.status()).toBe(201);

  // Validate created product
  await expect(page.locator('tbody')).toMatchAriaSnapshot(`- cell "Business Product"`);
  await expect(page.locator('tbody')).toMatchAriaSnapshot(`- cell "medium"`);
  await expect(page.locator('tbody')).toMatchAriaSnapshot(`- cell /\\d+\\.\\d+/`);

  // Open the created product and verify categories
  await page.getByRole('cell', { name: 'Business Product' }).first().click();

  const categoryLocator = page.locator('.pill-box-container .pill-box');
  await expect(categoryLocator).toHaveCount(2);
  await expect(categoryLocator.nth(0)).toHaveText('Sportswear');
  await expect(categoryLocator.nth(1)).toHaveText('Boys');
});
