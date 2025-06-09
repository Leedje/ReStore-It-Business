import { test, expect } from '@playwright/test';

test('Login should return HTTP 200 and a valid JWT token', async ({ page, request }) => {
  await page.goto('http://localhost:4300/business/login');

  await page.getByRole('textbox', { name: 'Email' }).fill('business@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('business');
  await page.getByRole('button', { name: 'Sign in' }).click();

  const response = await request.post('http://localhost:4300/api/login', {
    data: { email: 'business@gmail.com', password: 'business' }
  });

  expect(response.status()).toBe(200);

  const responseBody = await response.json();

  // Validate JWT token exists and follows expected format
  expect(responseBody).toHaveProperty('token');
  expect(responseBody.token).toMatch(/^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+$/);
});
