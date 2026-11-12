import { expect, test } from '@playwright/test';

// Layout shell (Phase 3): header slot, sidebar, footer, error pages. Runs in the `e2e` project.

test.describe('error pages', () => {
  test('unknown URLs are a localized 404 without the footer', async ({ page }) => {
    const response = await page.goto('/ru/no-such-page');

    expect(response?.status()).toBe(404);
    await expect(page.getByRole('heading', { level: 1 })).toContainText('404');
    await expect(page).toHaveTitle(/\| Wir\.by$/);
    await expect(page.locator('footer')).toBeHidden();
    await expect(page.getByRole('banner')).toBeVisible();
  });

  test('legacy /status/404 and /status/500 still render; other codes are a 404', async ({
    page,
  }) => {
    expect((await page.goto('/be/status/500'))?.status()).toBe(200);
    await expect(page.getByRole('heading', { level: 1 })).toContainText('500');
    expect((await page.goto('/be/status/418'))?.status()).toBe(404);
  });
});

test('pages show the footer', async ({ page }) => {
  await page.goto('/be');
  await expect(page.locator('footer')).toBeVisible();
  await expect(page.locator('footer')).toContainText(`© Wir.by, ${new Date().getFullYear()}`);
});

test('the header shows the motto on the main page only, also after client navigation', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/be');
  const banner = page.getByRole('banner');
  await expect(banner.getByRole('link', { name: /Беларуская/ })).toBeVisible();

  // client-side navigation through the (static, ≥1360px) sidebar
  await page
    .getByRole('navigation')
    .getByRole('link', { name: /Пра праект/i })
    .click();
  await expect(page).toHaveURL(/\/be\/about$/);
  // the title link (the logo link has the same accessible name)
  await expect(banner.locator('a', { hasText: /На галоўную/i })).toBeVisible();
  await expect(banner.getByRole('link', { name: /Беларуская/ })).toHaveCount(0);
});

test.describe('mobile sidebar', () => {
  test.use({ viewport: { width: 375, height: 800 } });

  test('the burger opens it, and following a link closes it', async ({ page }) => {
    await page.goto('/be');
    const burger = page.getByRole('button', { name: 'Адкрыць' });
    const sidebar = page.getByRole('navigation');

    await expect(sidebar).toBeHidden();
    await burger.click();
    await expect(sidebar).toBeVisible();
    await expect(sidebar.getByRole('link', { name: 'по-русски' })).toBeVisible();

    await sidebar.getByRole('link', { name: /Пра праект/i }).click();
    await expect(page).toHaveURL(/\/be\/about$/);
    await expect(burger).toHaveAttribute('aria-expanded', 'false');
    await expect(sidebar).toBeHidden();
  });

  test('the close button closes it', async ({ page }) => {
    await page.goto('/be');
    await page.getByRole('button', { name: 'Адкрыць' }).click();
    await page.getByRole('button', { name: 'Закрыць' }).click();
    await expect(page.getByRole('navigation')).toBeHidden();
  });
});

test('switching the language keeps the page and remembers the choice', async ({
  page,
  context,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/be/status/404');

  await page.getByRole('navigation').getByRole('link', { name: 'in english' }).click();
  await expect(page).toHaveURL(/\/en\/status\/404$/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  expect((await context.cookies()).find(c => c.name === 'WIR_LOCALE')?.value).toBe('en');

  await page.goto('/be');
  await expect(page).toHaveURL(/\/en$/);
});
