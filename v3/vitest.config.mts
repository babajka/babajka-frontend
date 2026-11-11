import { fileURLToPath } from 'node:url';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

// Dates in tests are written as UTC (`new Date('2024-01-15')`); pin the zone so they don't shift.
process.env.TZ = 'UTC';

export default defineConfig({
  plugins: [react()],
  resolve: {
    // Same alias as `paths` in tsconfig.json.
    alias: { '@': fileURLToPath(new URL('.', import.meta.url)) },
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    include: ['**/*.test.{ts,tsx}'],
    exclude: ['node_modules/**', '.next/**', 'e2e/**', '.claude/**'],
  },
});
