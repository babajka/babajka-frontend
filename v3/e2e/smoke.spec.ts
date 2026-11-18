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
