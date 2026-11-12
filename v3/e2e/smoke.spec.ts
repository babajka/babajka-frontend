import { expect, test } from '@playwright/test';

// Smoke tests against v3 only (`npm run e2e`). Grows with each ported page in Phase 4.
test('placeholder page renders without console errors', async ({ page }) => {
  const errors: string[] = [];
  page.on('console', message => {
    if (message.type() === 'error') {
      errors.push(message.text());
    }
  });
  page.on('pageerror', error => errors.push(error.message));

  await page.goto('/');

  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Wir.by v3');
  expect(errors).toEqual([]);
});

// Needs the backend (dev API by default): checks the server → API path end to end.
test('home page renders the latest articles from the backend', async ({ page }) => {
  await page.goto('/');

  const articles = page.getByRole('article');
  await expect(articles.first()).toBeVisible();
  expect(await articles.count()).toBeGreaterThan(0);
  await expect(page.getByText(/articles on api\.wir\.by/)).toBeVisible();
});

test('locale routing: / redirects to /be, and pages render in their locale', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveURL(/\/be$/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'be');

  await page.goto('/ru');
  await expect(page.locator('html')).toHaveAttribute('lang', 'ru');
  await expect(page.getByText(/Белорусская/)).toBeVisible();
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
