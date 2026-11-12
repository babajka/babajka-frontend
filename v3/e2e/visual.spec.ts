import { expect, test, type Page } from '@playwright/test';

import { expandFixtures } from './routes';
import { VIEWPORTS } from './viewports';

/**
 * Visual parity: legacy (baseline) vs v3, see "Visual parity" in README.md.
 *
 *   npm run visual:baseline   # project `legacy` writes e2e/__screenshots__/
 *   npm run visual:compare    # project `v3` diffs against them
 *   npm run visual:compare -- --grep article-poem-split
 *
 * Both projects run this same file and read the same snapshot files (the project name is not part
 * of `snapshotPathTemplate`).
 */

// Freezes "today" in the browser (diary block, diary page). A Monday, mid-morning in Minsk.
const FIXED_TIME = new Date('2026-11-09T09:00:00+03:00');

// Masked on every page: third-party embeds and players (YouTube, Coub, audio, quizzes).
// Per-page masks (random motto, tinder cards, ...) are added as pages are ported in Phase 4, with a
// selector for each app, because legacy and v3 markup differ.
const GLOBAL_MASKS = ['iframe'];

const waitForStablePage = async (page: Page) => {
  await page.waitForLoadState('networkidle');
  await page.evaluate(() => document.fonts.ready);
};

for (const fixture of expandFixtures()) {
  test.describe(`${fixture.name} ${fixture.lang}`, () => {
    for (const viewport of VIEWPORTS) {
      test.describe(viewport.name, () => {
        test.use({ viewport: { width: viewport.width, height: viewport.height } });

        test(`${fixture.url} @${viewport.width}`, async ({ page }) => {
          await page.clock.setFixedTime(FIXED_TIME);
          await page.goto(fixture.url);
          await waitForStablePage(page);

          await expect(page).toHaveScreenshot(
            [fixture.name, `${fixture.lang}-${viewport.width}.png`],
            {
              fullPage: true,
              mask: GLOBAL_MASKS.map(selector => page.locator(selector)),
            }
          );

          // Structural check once per fixture × locale: catches missing text and links, and
          // survives small pixel noise. (Playwright flattens `/` in aria snapshot names.)
          if (viewport.name === 'desktop' && !fixture.ariaDiffers) {
            await expect(page.locator('main')).toMatchAriaSnapshot({
              name: `${fixture.name}-${fixture.lang}.aria.yml`,
            });
          }
        });
      });
    }
  });
}
