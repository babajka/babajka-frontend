// eslint-disable-next-line import/no-unresolved
import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      components: path.resolve(__dirname, 'components'),
      constants: path.resolve(__dirname, 'constants'),
      hooks: path.resolve(__dirname, 'hooks'),
      lib: path.resolve(__dirname, 'lib'),
      utils: path.resolve(__dirname, 'utils'),
      features: path.resolve(__dirname, 'features'),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.js'],
    include: ['**/*.test.js', '**/*.test.ts', '**/*.test.jsx', '**/*.spec.js', '**/*.spec.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
    },
  },
});
