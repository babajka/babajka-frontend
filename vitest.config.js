import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: {
      components: '/Users/drapegnik/projects/wir/babajka-frontend/components',
      constants: '/Users/drapegnik/projects/wir/babajka-frontend/constants',
      hooks: '/Users/drapegnik/projects/wir/babajka-frontend/hooks',
      lib: '/Users/drapegnik/projects/wir/babajka-frontend/lib',
      utils: '/Users/drapegnik/projects/wir/babajka-frontend/utils',
      features: '/Users/drapegnik/projects/wir/babajka-frontend/features',
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
