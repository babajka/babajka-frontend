import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import prettier from 'eslint-config-prettier/flat';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Turns off rules that conflict with Prettier; formatting is checked by `prettier --check`.
  prettier,
  {
    rules: {
      'no-console': ['error', { allow: ['warn', 'error'] }],
    },
  },
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    // Local tooling output
    'coverage/**',
    'playwright-report/**',
    'test-results/**',
    '.claude/**',
    '.agents/**',
  ]),
]);

export default eslintConfig;
