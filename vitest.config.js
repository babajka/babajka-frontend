// eslint-disable-next-line import/no-unresolved
import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  // legacy source files are `.js` with JSX
  esbuild: {
    jsx: 'automatic',
    loader: 'jsx',
    include: /\.[jt]sx?$/,
    exclude: [],
  },
  resolve: {
    alias: {
      components: path.resolve(__dirname, 'components'),
      constants: path.resolve(__dirname, 'constants'),
      hooks: path.resolve(__dirname, 'hooks'),
      lib: path.resolve(__dirname, 'lib'),
      utils: path.resolve(__dirname, 'utils'),
      features: path.resolve(__dirname, 'features'),
      pages: path.resolve(__dirname, 'pages'),
      data: path.resolve(__dirname, 'data'),
      styles: path.resolve(__dirname, 'styles'),
      assets: path.resolve(__dirname, 'assets'),
      routes: path.resolve(__dirname, 'routes.js'),
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom'],
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
