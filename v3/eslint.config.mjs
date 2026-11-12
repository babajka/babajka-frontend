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
      // `_` / `_name` mark intentionally unused values (e.g. fields dropped by destructuring),
      // like the legacy ESLint config.
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_', ignoreRestSiblings: true },
      ],
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
