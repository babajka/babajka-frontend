import { defineConfig, devices } from '@playwright/test';

/**
 * Projects:
 *   e2e     smoke tests against v3                      (npm run e2e)
 *   legacy  visual parity, writes the baseline          (npm run visual:baseline)
 *   v3      visual parity, compares against the baseline (npm run visual:compare)
 *
 * Set LEGACY_URL / V3_URL to run against deployed apps (e.g. dev.wir.by); local servers are then
 * not started.
 */

const LEGACY_URL = process.env.LEGACY_URL || 'http://localhost:3000';
const V3_URL = process.env.V3_URL || 'http://localhost:3001';

// `visual:baseline` sets PW_APP=legacy, so the legacy app is only started when it's needed.
const NEEDS_LEGACY = process.env.PW_APP === 'legacy';

// Both apps use the same backend, so they render the same content.
const BACKEND_URL = process.env.BACKEND_URL || 'https://api.wir.by';

const webServer = [];

if (!process.env.V3_URL && !NEEDS_LEGACY) {
  webServer.push({
    command: 'npm run dev',
    url: V3_URL,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    env: { BACKEND_URL },
  });
}

if (!process.env.LEGACY_URL && NEEDS_LEGACY) {
  webServer.push({
    // Legacy runs on its own Node version (root `.nvmrc`), so go through nvm. Needs the root
    // `npm ci` and `.env` with BABAJKA_GOOGLE_API_KEY (see root CLAUDE.md).
    command: 'bash -c \'. "$NVM_DIR/nvm.sh" && cd .. && nvm exec npm run dev\'',
    url: LEGACY_URL,
    reuseExistingServer: true,
    timeout: 300_000,
    env: { BACKEND_URL },
  });
}

export default defineConfig({
  testDir: './e2e',
  // One baseline for both apps: the project name is not part of the path.
  snapshotPathTemplate: '{testDir}/__screenshots__/{arg}{ext}',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [['github'], ['html', { open: 'never' }]] : [['html']],
  expect: {
    toHaveScreenshot: {
      animations: 'disabled',
      caret: 'hide',
      stylePath: './e2e/visual.css',
      // Loosen per route only, with a comment why (e.g. font hinting: next/font vs Google CSS).
      maxDiffPixelRatio: 0.01,
    },
    toMatchAriaSnapshot: {
      pathTemplate: '{testDir}/__screenshots__/{arg}{ext}',
    },
  },
  use: {
    ...devices['Desktop Chrome'],
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'e2e', testMatch: 'smoke.spec.ts', use: { baseURL: V3_URL } },
    { name: 'legacy', testMatch: 'visual.spec.ts', use: { baseURL: LEGACY_URL } },
    { name: 'v3', testMatch: 'visual.spec.ts', use: { baseURL: V3_URL } },
  ],
  webServer,
});
