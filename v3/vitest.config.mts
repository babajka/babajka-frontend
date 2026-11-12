import { fileURLToPath } from 'node:url';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

// Dates in tests are written as UTC (`new Date('2024-01-15')`); pin the zone so they don't shift.
process.env.TZ = 'UTC';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Same alias as `paths` in tsconfig.json.
      '@': fileURLToPath(new URL('.', import.meta.url)),
      // `server-only` throws outside React Server Components (its guard against client bundles).
      // jsdom tests import server modules directly, so use its no-op server entry.
      'server-only': fileURLToPath(new URL('./node_modules/server-only/empty.js', import.meta.url)),
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    include: ['**/*.test.{ts,tsx}'],
    exclude: [
      'node_modules/**',
      '.next/**',
      'e2e/**',
      'coverage/**',
      'playwright-report/**',
      'test-results/**',
      // locally installed agent skills (gitignored)
      '.claude/**',
      '.agents/**',
    ],
  },
});
