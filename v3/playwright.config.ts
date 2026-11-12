import { defineConfig, devices } from '@playwright/test';

/**
 * Which tests run is chosen by PW_APP, set by the npm scripts:
 *   (unset)        e2e     smoke tests against v3                       (npm run e2e)
 *   PW_APP=legacy  legacy  visual parity, writes the baseline           (npm run visual:baseline)
 *   PW_APP=v3      v3      visual parity, compares against the baseline (npm run visual:compare)
 *
 * Only that one project exists in a run, so a plain `npx playwright test` runs the smoke tests and
 * never screenshots against a server that isn't running or a baseline that doesn't exist.
 *
 * Set LEGACY_URL / V3_URL to run against deployed apps (e.g. dev.wir.by); local servers are then
 * not started.
 */

const LEGACY_URL = process.env.LEGACY_URL || 'http://localhost:3000';
const V3_URL = process.env.V3_URL || 'http://localhost:3001';

const PW_APP = process.env.PW_APP as 'legacy' | 'v3' | undefined;
if (PW_APP && PW_APP !== 'legacy' && PW_APP !== 'v3') {
  throw new Error(`Unknown PW_APP=${PW_APP}, expected 'legacy' or 'v3'.`);
}
const NEEDS_LEGACY = PW_APP === 'legacy';

const PROJECTS = {
  e2e: { name: 'e2e', testMatch: ['smoke.spec.ts', 'layout.spec.ts'], use: { baseURL: V3_URL } },
  legacy: { name: 'legacy', testMatch: 'visual.spec.ts', use: { baseURL: LEGACY_URL } },
  v3: { name: 'v3', testMatch: 'visual.spec.ts', use: { baseURL: V3_URL } },
};

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
    // Legacy runs on its own Node version (root .nvmrc), started through nvm (see the script).
    command: 'bash e2e/start-legacy.sh',
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
  projects: [PROJECTS[PW_APP ?? 'e2e']],
  webServer,
});
