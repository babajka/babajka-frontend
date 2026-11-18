# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Code style, naming, and general command reference live in AGENTS.md — follow it:

@AGENTS.md

## Setup gotchas

- `lib/` and `assets/` are **git submodules** (`babajka/lib`, `babajka/assets`). Run `git submodule update --init` after cloning. Changes to files under `lib/` belong to the submodule repo, not this one.
- `npm install` runs `postinstall` → `fetch-data`, which pulls `data/i18n.json` and `data/team.json` from Google Sheets. It needs `BABAJKA_GOOGLE_API_KEY` in `.env` (see `.env.example`) and fails without it.
- Node version is pinned in `.nvmrc` (`nvm use`).

## Tests

Vitest with jsdom, globals enabled, `@testing-library/jest-dom` matchers loaded via `vitest.setup.js`. Tests are colocated as `*.test.js` (JSX allowed; `.jsx` is rejected by ESLint). Vitest globals (`describe`, `it`, `expect`, `vi`) are declared for test files in `.eslintrc.js`; `v3/` is excluded. Page tests live in `__tests__/pages/`, because files in `pages/` become routes. Mock `routes` (`vi.mock('routes', ...)`) when rendering components that use `components/common/Link`.

```bash
npm run test:run                              # run all once (npm run test = watch mode)
npx vitest run utils/localization.test.js     # single file
npx vitest run -t "test name"                 # filter by test name
```

Path aliases (`components/`, `utils/`, ...) come from babel `module-resolver` in the app but are duplicated as explicit `resolve.alias` entries in `vitest.config.js` — add a new alias there if you add a new top-level source dir.

## Architecture

### Custom Express server + `next-routes` (not plain Next.js routing)

`server.js` wraps Next with Express and is the entry point for both dev and prod (`npm run dev` → `node server.js`):

- Proxies `/api`, `/auth`, `/test` to `BACKEND_URL` (from env, `--backend-url` arg, or default `https://api.wir.by`; see `constants/server.js`).
- Enforces a **locale prefix** on every URL: `/` and paths without a valid locale redirect to `/<locale>/...`, using the `WIR_LOCALE` cookie or `DEFAULT_LOCALE`. Paths in `STATIC_PATHS` (from `constants/index.js`) bypass this.

`routes.js` defines all routes with `next-routes`; every pattern is prefixed with `/:lang(<VALID_LOCALES>)`. Adding a page means adding a file in `pages/` **and** an entry in `ROUTES` in `routes.js`. Use `ROUTES_NAMES` from `routes` and the project's `components/common/Link` rather than hardcoding paths. Files shared with the server (`routes.js`, `constants/index.js`, `constants/server.js`, `utils/env.js`, `utils/args.js`) must stay CommonJS.

### Data fetching

- `constants/api.js` is the registry of backend endpoint URLs (all under `/api`).
- `utils/request.js` `makeRequest()` prefixes `BACKEND_URL` on the server (bypassing the proxy) and uses relative URLs in the browser. Pages use `getServerSideProps` wrapped in `catchServerSideErrors` (maps 404 → `notFound`, other errors → redirect to `/status/500`).
- Article content comes from Fibery rich text; `utils/fibery/` renders it.

### Layout & i18n

- `pages/_app.js` reads an optional static `Component.getLayoutProps(pageProps)` on each page to set title (an i18n key), and `hideHeader`/`hideSidebar`/`hideFooter`, then renders `CoreLayout`.
- Locale is derived from the router (`utils/localization.js`) and provided via `LocaleContext`. UI strings come from `data/i18n.json` (generated, see above) via `<Text id="..."/>`, `useLocalization(id)`, or `localize(id, lang)` from `components/common/Text`; missing keys fall back to `DEFAULT_LOCALE`, then to the key itself.
- `bem-css-modules` is configured with `throwOnError: true` and `--` as modifier delimiter, so referencing a BEM element/modifier missing from the `.module.scss` throws at runtime.

### Environments

`utils/env.js` = `WIR_ENV || NODE_ENV || 'develop'`. `next.config.js` exposes `process.env.isProd` / `isStaging` / `isDev`; analytics (GA, Yandex Metrika) only load when `isProd`. `npm run build` refuses to run without `BACKEND_URL` set (`make build` sets it to prod API).

### v3 migration

`v3/` is a separate app (own `package.json`) for the in-progress rewrite. The phased plan and checklist are in `v3/README.md`; update its checkboxes when completing phases.

**Current state:** Phases 1–2 are done. `v3/` runs Next 16.4 / React 19.3 / Tailwind v4 / TypeScript on Node 26, with the design tokens, i18n (`app/[lang]`, `proxy.ts` locale redirects, typed dictionary) and cached data loaders in place. It serves a placeholder page on `:3001`; the layout shell (Phase 3) and the pages (Phase 4) are next. Before working in `v3/`, read `v3/AGENTS.md` (imported by `v3/CLAUDE.md`): Next 16 differs from training data, and the version-matched docs are in `v3/node_modules/next/dist/docs/`. The root app is the legacy app being preserved (and covered with tests) during migration.

- Run v3 commands on Node 26 from `v3/` (`cd v3 && nvm use`). The root's Node 18 can't run them.
- v3 has its own lint, test and CI setup (`.github/workflows/v3.yml`). The root ESLint, Vitest and lint-staged configs skip `v3/`, but the root Prettier still checks `v3/**/*.md`.

## Commits

semantic-release derives versions from commit messages: `fix(scope):`/`style(scope):` → patch, `feat(scope):` → minor, `major(scope):` → major.

## Pull requests

When opening or updating a PR (`gh pr create` / `gh pr edit`):

1. **Generate the description** from the actual diff against `master` (`git diff origin/master...HEAD`), not from commit messages alone. Sections:
   - **Summary**: what changed and why, grouped by area.
   - **Changes visible to users**: every behavior or UI change in the production app (pages, components, titles, meta tags, locales), with the root cause for bug fixes. Say explicitly if there are none. Include changes from submodule bumps (`lib`, `assets`).
   - **QA**: a checklist with concrete steps (exact URLs for `be`/`ru`/`en`, what to click, expected text or values), split into build/deploy, per-change checks and CI. Mention environment requirements (Node version, env vars, server-side `npm ci`).
2. **Attach labels** that match the PR, picked from the repo's existing labels (`gh label list`): `🐞bug`/`🔨fix` for fixes, `⭐feature`, `✨improvement`, `🌳refactor`, `💅styles`, `⚙️tools` for CI, tooling and tests, `dependencies` for dependency or lockfile changes, `🚧WIP` for drafts.
