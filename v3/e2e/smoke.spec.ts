import { expect, test } from '@playwright/test';

// Smoke tests against v3 only (`npm run e2e`).
test('main page renders without console errors', async ({ page }) => {
  const errors: string[] = [];
  page.on('console', message => {
    if (message.type() === 'error') {
      errors.push(message.text());
    }
  });
  page.on('pageerror', error => errors.push(error.message));

  await page.goto('/be');

  await expect(page.locator('main a[href^="/be/article/"]').first()).toBeVisible();
  expect(errors).toEqual([]);
});

test('an article opens from the main page', async ({ page }) => {
  await page.goto('/be');

  await page.locator('main a[href^="/be/article/"]').first().click();

  await expect(page).toHaveURL(/\/be\/article\//);
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
});

test('locale routing: / redirects to /be, and pages render in their locale', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveURL(/\/be$/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'be');

  await page.goto('/ru');
  await expect(page.locator('html')).toHaveAttribute('lang', 'ru');
  await expect(page.getByText(/Белорусская/).first()).toBeVisible();
});

test('the WIR_LOCALE cookie switches to the preferred locale', async ({
  page,
  context,
  baseURL,
}) => {
  await context.addCookies([{ name: 'WIR_LOCALE', value: 'en', url: baseURL! }]);

  await page.goto('/be');
  await expect(page).toHaveURL(/\/en$/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
});
