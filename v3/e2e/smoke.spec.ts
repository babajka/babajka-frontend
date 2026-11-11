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
