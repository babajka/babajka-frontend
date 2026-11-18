# babajka-frontend v3

Rewrite of babajka-frontend from `next@10` + React 16 + Express/next-routes + SCSS/BEM to the current stack:

|           | Legacy (root)                                         | v3 target                                                |
| --------- | ----------------------------------------------------- | -------------------------------------------------------- |
| Runtime   | Node 18 (`.nvmrc`), engines `~15.4`                   | **Node 26 LTS**                                          |
| Framework | Next 10, Pages Router, custom Express server          | **Next 16.4+**, App Router, no custom server             |
| React     | 16.13                                                 | **19.3** (+ React Compiler)                              |
| Language  | JS + PropTypes                                        | **TypeScript (strict)**                                  |
| Styling   | SCSS + BEM CSS modules, normalize.css, Font Awesome 5 | **Tailwind CSS v4** (CSS-first `@theme`)                 |
| Bundler   | webpack 4                                             | Turbopack (default)                                      |
| Data      | `getServerSideProps` per request, no caching          | Server Components + **Cache Components** (`'use cache'`) |
| i18n      | Express redirects + `next-routes` `/:lang`            | `app/[lang]` segment + `proxy.ts`                        |
| Tests     | Vitest (unit)                                         | Vitest 4 (unit) + Playwright (e2e + visual parity)       |
| Deploy    | pm2 + `server.js`                                     | pm2 + `output: 'standalone'`                             |

**Rule:** v3 lives in `v3/` with its own `package.json` until every page passes visual parity.

- It runs next to legacy: legacy on `:3000`, v3 on `:3001`.
- Both apps talk to the same backend.
- Nothing in the root app changes except bug fixes.

## Getting started

```bash
cd v3
nvm use            # Node 26
npm ci
npm run dev        # http://localhost:3001, BACKEND_URL defaults to https://api.wir.by
```

## Deploy to Майстэрня (preview)

v3 is deployed as a public preview at **https://wir.skarb.click** (`skarb.yml`: `access: public`). The image is built on the NAS from `Dockerfile`; no local Docker is needed.

```bash
cd v3 && nvm use
skarb login            # once, in the browser
npm run deploy         # predeploy: lint + typecheck + test, then `skarb deploy`
npm run deploy:status  # state and recent builds
npm run deploy:logs    # app log (skarb logs --build for the build log)
```

- **Backend:** the dev API `https://api.wir.by`, like the legacy dev deploy. `BACKEND_URL` is a build `ARG` in the `Dockerfile` (the `/api` rewrites are fixed at build time), and is also set at runtime for server-side fetches. Change it there, not with `skarb secrets`.
- **How the app reaches the API:** only from the server. `lib/api.ts` fetches `BACKEND_URL` directly, and browser requests to `/api/*` (e.g. images via `next/image`) go through the rewrite. So CORS and the `wir.skarb.click` domain don't matter to the backend.
- **Read-only image:** the container runs as a non-root user and only `/data` and `/tmp` are writable. `.next/cache` (incl. optimized images) is a symlink to `/tmp/next-cache`, so the cache is lost on each deploy or restart.
- **Not indexed:** the image sets `NOINDEX=true`, so `proxy.ts` sends `X-Robots-Tag: noindex, nofollow` on every response: pages, `/_next/image`, static files and the `/api` proxy (`headers()` in `next.config.ts` doesn't reach the external `/api` rewrite, so with `NOINDEX` the proxy does that rewrite itself). Pages also have `<meta name="robots" content="noindex, nofollow">`. Without `NOINDEX` (future prod), the proxy does nothing.
- **Deployment check:** the home page renders the latest articles (`components/LatestArticles.tsx`) at request time, with the backend host and fetch time. If the backend is unreachable, it shows the error instead of a 500.

## Commands

```bash
npm run dev            # next dev --port 3001 (Turbopack)
npm run build          # next build (standalone); needs BACKEND_URL (fixed at build time, see below); postbuild copies public/ and .next/static
npm run start          # node .next/standalone/server.js on PORT (default 3001)
npm run lint           # eslint (flat config) + prettier --check
npm run format         # prettier --write + eslint --fix
npm run typecheck      # next typegen + tsc --noEmit (clears stale .next/dev/types first, see below)
npm run test           # vitest run (unit); test:watch for watch mode
npm run e2e            # playwright smoke tests against v3 (starts `npm run dev`); also the default for `npx playwright test`
npm run visual:baseline  # screenshot legacy (:3000) → baseline
npm run visual:compare   # screenshot v3 (:3001) and diff against baseline
npm run analyze        # next analyze (Turbopack bundle analyzer)
npm run fetch-dict     # Phase 2: node scripts/fetch-dict.ts → data/i18n.json
```

`npm run build` and `npm run typecheck` delete `.next/dev/types` first (`clean-dev-types`). `next dev` writes route types there for the branch it ran on, `tsconfig.json` includes them, and `next build`/`tsc` don't regenerate them. After switching branches, stale ones fail the type check with errors like `__InvalidParamMatchingKeys` or `Cannot find module '…/page.js'`. Both commands generate fresh route types in `.next/types` themselves, and a running `next dev` rewrites its own on the next change.

---

## Review of the old "Stack / Features Checklist"

| Old item             | Status     | Notes                                                                                                                            |
| -------------------- | ---------- | -------------------------------------------------------------------------------------------------------------------------------- |
| TypeScript           | ✅ Phase 1 | TS 5.x strict, `moduleResolution: bundler`, `@/*` alias.                                                                         |
| Tailwind CSS         | ✅ Phase 1 | Tailwind v4, CSS-first (`@import 'tailwindcss'`, tokens via `@theme` in Phase 2), `@tailwindcss/turbopack` loader. No JS config. |
| Next.js App Router   | ✅ Phase 1 | Next 16.4.6, App Router, Turbopack.                                                                                              |
| Next Image Component | ❌         | Planned with a custom loader for the backend's `?w=` resizing (Phase 5).                                                         |
| `@next/fonts`        | ❌ wrong   | The package was removed in Next 14. Use the built-in `next/font/google`.                                                         |
| next i18n support    | ❌ n/a     | The App Router has no built-in i18n. Use the `[lang]` segment + `proxy.ts` (Phase 2).                                            |
| Server Components    | ❌         | Nothing migrated yet.                                                                                                            |
| Vitest testing       | ✅ Phase 1 | Vitest 4 + Testing Library + jsdom; legacy unit tests ported.                                                                    |
| React 18             | ✅ Phase 1 | React 19.3 with the React Compiler.                                                                                              |

## Agent skills used during migration

Skills are **project-scoped in `v3/`**. Only `v3/skills-lock.json` is committed, to record sources and hashes. The skill files themselves (`v3/.claude/skills/`) are gitignored, and each developer installs them locally after cloning. Claude Code exposes them with a `v3:` prefix, only when working inside `v3/`.

```bash
cd v3 && nvm use   # the skills CLI needs Node >= 22 (fails on the root's Node 16/18)

# install / restore (into v3/.claude/skills, for Claude Code)
npx skills add vercel-labs/agent-skills -a claude-code -y \
  -s vercel-react-best-practices -s vercel-composition-patterns \
  -s vercel-react-view-transitions -s web-design-guidelines
npx skills add lombiq/tailwind-agent-skills -s tailwind-4-docs -a claude-code -y
npx skills add wshobson/agents -s tailwind-design-system -a claude-code -y
npx skills add currents-dev/playwright-best-practices-skill -s playwright-best-practices -a claude-code -y

npx skills update -p   # update project skills
```

Don't use `npx skills experimental_install` to restore. It installs into the generic `v3/.agents/skills/`, which Claude Code doesn't read.

Third-party skills run with full agent permissions. Review a new skill (or an update that changes `skills-lock.json` hashes) before committing the lockfile.

**Installed now** (knowledge/rules; no running app needed):

| Skill                           | Source                                         | Used for                                                                                           |
| ------------------------------- | ---------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| `vercel-react-best-practices`   | `vercel-labs/agent-skills`                     | Perf rules while writing components.                                                               |
| `vercel-composition-patterns`   | `vercel-labs/agent-skills`                     | Card/Block component APIs. They currently pass many props; move to compound components.            |
| `web-design-guidelines`         | `vercel-labs/agent-skills`                     | a11y/UX review of each migrated page. Fetches the latest rules from GitHub on each run.            |
| `vercel-react-view-transitions` | `vercel-labs/agent-skills`                     | Optional page transitions (Phase 5).                                                               |
| `tailwind-4-docs`               | `lombiq/tailwind-agent-skills`                 | Tailwind v4 API; agents tend to write v3 syntax. **Needs a one-time local docs snapshot** (below). |
| `tailwind-design-system`        | `wshobson/agents`                              | Turning SCSS tokens into `@theme`.                                                                 |
| `playwright-best-practices`     | `currents-dev/playwright-best-practices-skill` | Visual/e2e test harness.                                                                           |

`tailwind-4-docs` setup. The Tailwind docs are source-available but not open source, so each developer creates the snapshot locally (refresh weekly):

```bash
cd v3 && python3 .claude/skills/tailwind-4-docs/scripts/sync_tailwind_docs.py --accept-docs-license
```

**Install in Phase 1**, once v3 runs Next 16.4. These drive a running `next dev` (`/_next/mcp`) or the Turbopack bundle analyzer:

| Skill                               | Install                                                                                                                  | Used for                                                                |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------- |
| `next-dev-loop`                     | `npx skills add vercel/next.js -s next-dev-loop -a claude-code -y` + `npm i -g agent-browser@latest` (needs `>= 0.31.1`) | Agent verifies each page at runtime: DOM, console, network, React tree. |
| `next-cache-components-optimizer`   | `npx skills add vercel/next.js -s next-cache-components-optimizer -a claude-code -y`                                     | `instant()` tests for key navigations (Phase 5).                        |
| `next-partial-prefetching-adoption` | `npx skills add vercel/next.js -s next-partial-prefetching-adoption -a claude-code -y`                                   | Shared loading shells for links.                                        |
| `next-bundle-optimizer`             | `npx skills add vercel/next.js -s next-bundle-optimizer -a claude-code -y`                                               | JS size audit before cutover.                                           |

**Not a skill:** Next.js docs. From 16.3, `next dev` writes a pointer into `v3/AGENTS.md` to the version-matched docs in `node_modules/next/dist/docs/`. Read those before writing Next code.

Not used:

- `vercel-optimize`, `deploy-to-vercel`, `vercel-cli-with-tokens`: v3 stays self-hosted.
- `react-native-skills`, `writing-guidelines`: not relevant.
- `next-cache-components-adoption`: v3 starts with Cache Components on, so there is nothing to adopt.
- Old `vercel-labs/next-skills` knowledge skills: retired in favour of the bundled docs.

---

# Migration plan

## Phase 0 — Legacy safety net

- [x] Vitest in legacy root, tests for `utils/`, `constants/`, `lib/utils`
- [x] CI (`.github/workflows/lint-build.yml`) runs `npm ci`, `lint:ci` (check-only), `test:run` and `make build` on PRs and pushes to `master`.
  - [ ] Enable GitHub Actions for the repo. Both workflows were `disabled_manually`, so CI never ran.
  - Legacy builds on Node 18 only with `--openssl-legacy-provider` (webpack 4), which is now set in the `build`/`dev` scripts.
- [x] Fix known legacy bugs first, so the baseline screenshots are correct (with regression tests):
  - [x] `pages/article.js` set `layoutProps`, but `_app` reads `getLayoutProps`, so the page title was wrong. Test: `__tests__/pages/article.test.js`.
  - [x] `DiaryBlock` expected a `lang` prop that `CardBlocksLayout` never passed, so dates were always in `be`. It now reads `LocaleContext`. Test: `features/layout/blocks/diary/DiaryBlock.test.js`.
- [x] Collect a **fixture list of real URLs** in `v3/e2e/routes.ts`: 21 fixtures, 38 URLs, all checked against wir.by.
  - Articles were picked by scanning all 123 prod articles for Fibery features: TABLE, NOTE, POEM, SPLIT, TIMELINE, CAROUSEL, FILLOUT_QUIZ, YouTube, Coub, quote, right-aligned image, ex.co quiz, plus audio/video/collection articles and `ru` content.
  - Also covered: main, about, topic, tag, collection, diary (slug and today), status 404/500, not-found, both games.
  - Prod content has no TABLE_RIGHT tables, no Yandex Music playlist embeds, and no `en` article texts. Port these renderer paths with unit tests instead of screenshots.
  - Each fixture lists its `unstable` parts (random motto, today's diary, embeds, tinder shuffle), which the visual harness must mask or freeze.

## Phase 1 — Fresh v3 scaffold

Delete the old scaffold (`v3/app`, configs, lockfile) and regenerate it with `npx create-next-app@latest v3`, choosing:

- TS, Tailwind, ESLint, App Router, Turbopack
- no `src/`
- alias `@/*`

Then:

Generated with `create-next-app@16.4.6 --react-compiler --cache-components --agents-md` on Node 26.

- [x] Keep `v3/skills-lock.json`, `v3/README.md` and `v3/e2e/` when deleting the old scaffold, then reinstall the skills with the commands in "Agent skills".
  - The skills CLI upgraded `skills-lock.json` to format v2, which blanked the old hashes. Reinstalling recomputed them; the skill contents were unchanged.
- [x] `v3/.nvmrc` → `26`; `engines.node: ">=26"`
- [x] Install the Phase 1 skills (`next-cache-components-optimizer`, `next-partial-prefetching-adoption`, `next-bundle-optimizer`, `next-dev-loop`). See "Agent skills".
- [ ] `agent-browser` for `next-dev-loop`: a global install, which each developer does locally (`npm i -g agent-browser@latest` on Node 26). `next-dev-loop` now needs `>= 0.31.1`.
- [x] Commit the `AGENTS.md` that `create-next-app`/`next dev` generates; it points to the bundled docs. Link the root `AGENTS.md` and `CLAUDE.md` to it.
  - `v3/CLAUDE.md` imports `v3/AGENTS.md`, so Claude Code reads it when working in `v3/`. v3 rules go below the generated block.
- [x] `next.config.ts`:
  - `output: 'standalone'`
  - `reactCompiler: true`
  - `cacheComponents: true`, `partialPrefetching: true`
  - `experimental.agentUpgrade: 'security'`
  - `typedRoutes: true`
  - `images`: `localPatterns` for `/api/files/**` (article images are relative backend URLs) and `remotePatterns` for `res.cloudinary.com/wir-by`. The custom loader comes in Phase 5.
  - `rewrites()` that proxy `/api/:path*`, `/auth/:path*` and `/test/:path*` to `BACKEND_URL`, matching the Express proxy in `server.js`. `/test` is kept on purpose: it serves local fixtures from the backend's `public/test` for fully local development.
  - The rewrite targets are fixed at `next build` (written into `routes-manifest.json`), so `BACKEND_URL` at `npm run start` has no effect. `npm run build` fails without `BACKEND_URL` (`prebuild` guard, like legacy `make build`). CI builds with `https://api-prod.wir.by`. `next dev` and `next typegen` default to `https://api.wir.by`.
  - `/rss` is **not** proxied. Checked: `wir.by/rss` → 301 → `wir.by/rss/`, a static `text/xml` file served by nginx, and `api.wir.by/rss` is 404. The Footer link must keep pointing at it (absolute `https://wir.by/rss` when porting the Footer, since v3 doesn't serve it).
  - `turbopack.root` and `outputFileTracingRoot` are pinned to `v3/`. Otherwise Next picks the legacy root (it has its own lockfile) as the workspace root.
- [x] `tsconfig.json`: strict, `@/*` alias
- [x] ESLint 9 flat config (`eslint-config-next` + `eslint-config-prettier`; `next lint` was removed in Next 16), Prettier 3 + `prettier-plugin-tailwindcss`, same style as the root (`printWidth: 100`, single quotes). Markdown is left to the root Prettier.
- [x] Vitest 4 + Testing Library + jsdom. Port the legacy unit tests for `localization`, `date`, `constants`, `lib/utils`.
  - The tested code was ported with them, as small TS modules: `constants/index.ts`, `utils/localization.ts`, `utils/date.ts` (date-fns v4), `lib/utils/{createConstants,isEmail,parseYoutubeUrl,parseCoubUrl,parseYMPlaylistUrl}.ts`.
  - Not ported: `getLocale` (reads the Pages Router `router`), `STATIC_PATHS` (only for the Express redirect), `isUrl` (unused).
  - `vitest.config.mts` pins `TZ=UTC`, so the date tests pass in any timezone.
- [x] Playwright + the visual harness (see the "Visual parity" section below). Checked end to end on `about` (`be`): the legacy baseline renders correctly.
- [x] CI job `v3` in `.github/workflows/v3.yml` (runs only on changes to `v3/**`):
  - `npm ci`, `lint`, `typecheck`, `test`, `build`
  - `npm audit --audit-level=high` must pass (currently 7 moderate, all in the `@typescript-eslint` chain)
  - Dependabot for `v3/` (`.github/dependabot.yml`, weekly, grouped)
  - It only runs once GitHub Actions is enabled for the repo (see Phase 0).
- [x] Verify: `npm run dev` serves a placeholder at `:3001`, and `npm run build` works (the `e2e` smoke test checks the dev server).

**Setup gotcha:** `@opentelemetry/api` is a direct dependency even though nothing imports it. Next's tracer does a plain `require('@opentelemetry/api')`, which walks up out of `v3/` into the legacy `node_modules` and finds a 2020 version (0.14), so `next build` fails with `trace.getSpan is not a function`. The local copy shadows it. It can be removed after the Phase 6 move to the root.

## Phase 2 — Foundations

**Design tokens** (`app/globals.css`, `@theme`). Port the values from `styles/variables.scss`, `styles/responsiveness.scss`, `styles/typography.module.scss`.

- [ ] Colors:
  - `primary #1a9582`, `primary-dark #103a2a`
  - `caribbean #0dc6aa`, `turquoise #00ffd8`
  - `grey #888888`, `concrete #f2f2f2`, `widescreen-bg #c4c4c4`, `table #cccccc`
  - `warning #ed812b`, `error #e21017`
  - social colors
  - stray hardcoded colors from the modules: `#c4d4d5`, `#fe4771`, `#ff7860`, `#fef04c`, etc.
- [ ] Breakpoints. Legacy uses exclusive max-width ranges; convert them to mobile-first min-width:
  - `touch 500px`, `tablet 650px`, `tablet-lg 800px`, `desktop 1100px`, `sidebar 1360px`, `wide 1600px`
  - Base styles (no prefix) = mobile < 500.
- [ ] Typography utilities `text-body` and `text-title`, with the responsive size/line-height steps of `.common-text` and `.common-title`. Weights: 400/700 only.
- [ ] Container `content-padding` utility replacing `.wir-content-padding`, with page widths 300/480/624/818/1020.
- [ ] z-index scale: overlay 100, sidebar 200, modal 300/400, go-up 500.
- [ ] Card size tokens from `features/layout/cards/index.scss`: l, ms, square-m/s, s-wide, s, xs-wide, xs.
- [ ] `next/font/google` Ubuntu 400/700 (cyrillic, latin, latin-ext) as `--font-sans`. Drop the render-blocking Google Fonts `@import`. Keep Georgia as `--font-serif`.
- [ ] Icons: copy the ~12 used Font Awesome paths into `components/icons/*.tsx` as inline SVG. Drop the whole FA font (3 packs). Used icons:
  - times, heart, rss, circle-notch, arrow-alt-circle-up, envelope, arrow-right
  - brands: facebook-square, twitter, vk, telegram-plane, odnoklassniki
- [ ] `cn()` = `clsx` + `tailwind-merge`. It replaces `classnames` and `bem-css-modules`.

**i18n.**

- [ ] `app/[lang]/layout.tsx` is the root layout:
  - `<html lang={lang}>`
  - `generateStaticParams` → `be`, `ru`, `en`
- [ ] `proxy.ts` (Next 16's replacement for `middleware.ts`) ports the `server.js` logic exactly:
  - `/` → `/{cookie||be}`
  - a path without a locale → prefixed with one
  - a `WIR_LOCALE` cookie different from the path's locale → redirect
  - static paths are skipped
- [ ] Dictionary:
  - `scripts/fetch-dict.ts` runs natively on Node 26 (type stripping) and writes `data/i18n.json`.
  - Run it explicitly / in CI, not in `postinstall`.
  - Typed keys.
  - Server helper `getT(lang)` + client `useT()` for islands. Keep the `||` split behaviour of `<Text>`.
- [ ] Port `utils/localization.ts` (`localize`, `localizeFields`, `replaceLocale`) and `utils/getters.ts`.
  - `utils/localization.ts` is already ported (Phase 1, with tests); `utils/getters.ts` is left.
- [x] Date formatting: `date-fns` v4 with `be`, `ru`, `enUS` (`utils/date.ts`, ported in Phase 1).

**Data layer.**

- [ ] `lib/api.ts`: typed endpoint registry (from `constants/api.js`), using `URLSearchParams` instead of `querystring`.
- [ ] `lib/request.ts`:
  - server fetch to `BACKEND_URL`
  - `RequestError`
  - 404 → `notFound()`
- [ ] Cached loaders, one per resource, using `'use cache'`, `cacheLife(...)` and `cacheTag(...)`:
  - `getArticle(slug)`, `getMainPage()`, `getTopic(t)`, `getTag(t)`, `getCollection(s)`, `getDiary(slug|date)`, `getSidebar()`
  - Today the article, tag, topic and collection pages hit the backend on **every request**.
- [ ] Optional `app/_revalidate/route.ts` (secret-protected) to call `revalidateTag` from the backend on publish. Don't put it under `/api`, `/auth` or `/test`, which are proxied to the backend.
- [ ] Inline the used `lib/` submodule utils into `v3/lib/`, and drop the submodule dependency (Phase 1 already ported `createConstants`, `isEmail` and the three `parse*Url` with tests):
  - `clearUtmParams`, `createConstants`, `isEmail`
  - `parseYoutubeUrl`, `parseCoubUrl`, `parseYMPlaylistUrl`
  - `Clickable`, `TextWithSeparator`
- [ ] Copy `assets/logo` into `v3/components/Logo.tsx`.

## Phase 3 — Layout shell

- [ ] `app/[lang]/layout.tsx`: CoreLayout markup (root, space, content, footer) and default `generateMetadata`:
  - `og:*`, `twitter:site`, `fb:app_id`, locale, theme-color
  - `robots: noindex` unless production
  - favicon / apple-touch icon
  - This replaces `components/social/Metatags`.
- [ ] Sidebar: a client island with an off-canvas overlay below 1360px and a static column from 1360px up.
  - Sidebar data is fetched **on the server** (cached) instead of in a `useEffect`.
  - The language switch sets the cookie with a server action, or `document.cookie`; `js-cookie` is dropped.
- [ ] Header (server) + burger button (client). `Motto` random pick happens client-side after mount (mask it in screenshots).
- [ ] `HeaderLinks`: Portal-into-`#header-links` becomes a `@headerLinks` parallel-route slot, or a `headerLinks` prop via a per-page layout.
- [ ] Footer + `SubscribeForm` (client, or a server action that posts to `/api/mail`).
- [ ] Go-up button: a tiny client component; drop `react-scroll-up`.
- [ ] Layout flags (`hideHeader`, `hideSidebar`, `hideFooter`) become route groups:
  - `app/[lang]/(site)/…` for the normal chrome
  - `app/[lang]/(game)/…` for games without header/footer
- [ ] `not-found.tsx`, `error.tsx`, `global-error.tsx` replace `_error.js` and `pages/status.js`. Keep `/status/404|500` URLs as redirects.

## Phase 4 — Pages (one PR each, in this order)

Each page is done when:

1. it renders in v3,
2. `visual:compare` passes for that page at all viewports and locales,
3. the `next-dev-loop` check is clean (no console errors or hydration warnings),
4. `web-design-guidelines` review is done.

- [ ] `about` — static. Add `export const ensureStatic = 'navigation'`. Drop dead code: `features/about/*`, `team.json`, `partners.js`.
- [ ] `article/[slug]` — the biggest one:
  - Port the Fibery renderer (`utils/fibery/*`) as **server components**.
  - Embeds become client islands only where needed.
  - `generateMetadata` with `article:*` tags and other-locale links.
  - ex.co / Fillout quizzes via `next/script`.
- [ ] `topic/[topic]`, `topic/[topic]/tag/[tag]`, `collection/[slug]`.
- [ ] `diary/[[...slug]]`:
  - "Today" is computed from a date string passed into a cached loader.
  - Replace the `Router.replaceRoute` hack with `redirect()` to the canonical slug.
- [ ] Main page `/`:
  - `CardBlocksLayout` + all blocks/cards: `article.module.scss` (855 lines) and `tag.module.scss` (595 lines) are the largest Tailwind ports.
  - Localize on the server; legacy localizes in the browser after hydration, which causes a flash.
- [ ] `game/ny2021`, `game/tinder` (route group without chrome):
  - The tinder shuffle moves to the client; legacy shuffles once at build.
  - `POST` stats via a server action or `/api`.

## Phase 5 — Performance & quality (do along the way, measure before/after)

Measure each item against legacy with the bundle analyzer and Web Vitals (Lighthouse on both ports, same URL list).

1. **Server Components by default.** Only these become `'use client'` islands: sidebar toggle, share button, subscribe form, slider, games, diary arrows, quizzes. Legacy hydrates everything.
2. **Cache Components + Partial Prefetching.** Article, tag, topic and collection pages become cached static shells instead of per-request SSR, so TTFB drops from backend latency to a cache hit. Add `ensureStatic` on about/article layouts as a guard. Use `next-cache-components-optimizer` to add `instant()` tests for main → article and article → tag.
3. **Images.**
   - `next/image` with a **custom loader** that keeps the backend's `?w=` resizing. Cloudinary images use a Cloudinary loader.
   - Proper `sizes` and `preload` on the article/collection cover (LCP).
   - Lazy loading below the fold.
4. **Fonts.** `next/font` self-hosts Ubuntu with `size-adjust` fallback, which gives no CLS and no Google Fonts request. Drop the unused weight 300.
5. **Icons.** Inline SVG instead of Font Awesome webfonts + 3 icon CSS packs, which is about 100+ KB less CSS/fonts.
6. **Embeds.**
   - YouTube/Coub/Yandex Music use a click-to-load facade (poster + play button) instead of eager iframes.
   - Quizzes load via `next/script strategy="lazyOnload"`.
7. **Slider.** Replace swiper 5 + `react-id-swiper` with a CSS scroll-snap carousel and a tiny client island for the arrows. If parity needs it, fall back to Swiper 12 lazy-loaded with `next/dynamic`.
8. **Remove analytics completely.** v3 ships with no analytics; whether to bring it back is decided later (see [Later: analytics](#later-analytics)).
   - Drop Google Analytics. `react-ga` uses Universal Analytics, which stopped collecting data in 2023, so it currently does nothing.
   - Drop Yandex Metrika: the `loadYM` script injection and the `<noscript>` pixel.
   - Drop the `GA_ID`/`YM_ID` constants and `clearUtmParams`, which only exists for analytics.
   - This leaves no third-party scripts in the critical path and no tracking cookies, so no consent banner is needed.
9. **Dependencies dropped:**
   - `express`, `cookie-parser`, `http-proxy-middleware`, `command-line-args`, `next-routes`, `next-compose-plugins`
   - `env-ci`, `js-cookie`, `react-scroll-up`, `normalize.css`, `sass`, `bem-css-modules`, `prop-types`, `react-ga`
   - `lodash` → native or `es-toolkit`
   - `querystring`
   - `google-spreadsheet` becomes a devDependency used only by the script
10. **No JS-driven responsiveness.** `useWindowWidth` (Yandex Music height) becomes CSS, which removes a hydration mismatch.
11. **SEO.** `app/sitemap.ts`, `app/robots.ts`, `opengraph-image.tsx` for articles (optional), `alternates.languages` (hreflang) for be/ru/en.
12. **React Compiler** on, so no manual memoization (`useMemo(localizeData)` etc.).
13. **Optional:** `<ViewTransition>` page transitions (React 19.3 stable) via the `react-view-transitions` skill.
14. **Before cutover:** run `/next-bundle-optimizer`, compare `next analyze` snapshots, and set budgets in CI. These replace `size-limit`.

## Phase 6 — Side-by-side deploy & cutover

- [ ] Deploy v3 to `dev.wir.by` on a separate port/subdomain (e.g. `v3.dev.wir.by`):
  - pm2 app `frontend-v3-staging` → `node .next/standalone/server.js`
  - copy `public/` and `.next/static` into standalone
  - Node 26 on the server
- [ ] Run `visual:compare` against the deployed legacy + v3 (same harness, URLs via env).
- [ ] Compare Lighthouse/Web Vitals (legacy vs v3) on the fixture URLs and record the numbers here.
- [ ] Switch prod: point pm2 `frontend-production` to v3, keep legacy as an instant rollback for 1–2 weeks.
- [ ] Move `v3/` to the root, then delete:
  - legacy `pages/`, `components/`, `features/`, `styles/`, `hooks/`, `utils/`, `constants/`
  - `server.js`, `routes.js`, `.babelrc.js`, `stylelint.config.js`, the `lib`/`assets` submodules
  - old deps and the root `vitest.config.js`
- [ ] Update root `AGENTS.md`, `CLAUDE.md`, `README.md`, the deploy scripts in `bin/deploy/`, and `pm2-config.json`.

---

## Later: analytics

Not part of the migration. v3 launches without analytics (Phase 5, item 8). After cutover, decide whether we need it at all.

**Questions to answer first:**

- What decisions would the numbers drive? For example: which topics or formats to write more of, how traffic arrives (search, social, newsletter), or whether games and diary are worth maintaining.
- Do we need per-article stats, or are site-wide totals enough?
- Which constraints apply: privacy/GDPR (a consent banner is needed only if we set tracking cookies), where data is stored, budget, and who maintains it?

**Options (from lightest to heaviest):**

| Option                             | Client JS | Cookies / consent                  | Cost & effort                           | Notes                                                                                                                            |
| ---------------------------------- | --------- | ---------------------------------- | --------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| Nothing                            | 0         | none                               | 0                                       | Current state after v3.                                                                                                          |
| Server logs (nginx + GoAccess)     | 0         | none                               | low, self-hosted                        | Page views, referrers and bots, with no script. Less accurate (bots, caching).                                                   |
| Cloudflare Web Analytics           | ~5 KB     | cookieless                         | free                                    | Needs Cloudflare in front of the site, or their beacon. Page views, referrers and Web Vitals.                                    |
| Umami / Plausible CE (self-hosted) | ~1–2 KB   | cookieless                         | free software, needs a DB on our server | Simple dashboard, per-page stats, UTM and referrers, custom events (games, subscribe). Plausible also offers a paid hosted plan. |
| Own Web Vitals RUM                 | ~1 KB     | none                               | low                                     | `useReportWebVitals` posting to our backend. Performance only, not audience. Can be combined with any option above.              |
| GA4 (`@next/third-parties/google`) | ~50 KB+   | cookies → consent banner in the EU | free                                    | Most powerful, but heaviest, and Google-owned data. Needs a new `G-` property.                                                   |
| Yandex Metrika                     | ~50 KB+   | cookies → consent banner           | free                                    | Session recordings and heatmaps. Data is stored in Russia; check whether that's acceptable.                                      |

**Default recommendation:** if we decide we need analytics, use self-hosted Umami or Plausible CE. Load it via `next/script strategy="afterInteractive"`, plus Web Vitals RUM. That gives no cookies, no consent banner and a negligible performance cost.

---

# Visual parity (legacy vs v3)

Playwright drives both apps and uses its built-in screenshot diff. Legacy screenshots are the baseline; v3 screenshots must match them.

```
v3/e2e/
  routes.ts             # fixture URL list (path, locales, what it covers, unstable parts)
  viewports.ts          # one per legacy breakpoint range
  visual.spec.ts        # for each route × locale × viewport → expect(page).toHaveScreenshot()
  visual.css            # injected via stylePath (hides scrollbars)
  smoke.spec.ts         # v3-only smoke tests (`npm run e2e`)
  __screenshots__/      # baseline from legacy (gitignored): <fixture>/<lang>-<width>.png, <fixture>-<lang>.aria.yml
playwright.config.ts    # projects: e2e (v3), legacy (baseURL :3000), v3 (baseURL :3001)
```

- **One baseline for both apps.** `snapshotPathTemplate: '{testDir}/__screenshots__/{arg}{ext}'` leaves out the project name, so both projects read the same file.
  - `visual:baseline` = `PW_APP=legacy playwright test --update-snapshots`
  - `visual:compare` = `PW_APP=v3 playwright test`
  - `PW_APP` decides which single project exists in a run. Without it only the `e2e` smoke project runs, so a plain `npx playwright test` never screenshots a server that isn't running.
- **The HTML report** (`npx playwright show-report`) shows expected/actual/diff with a slider for each failure. That's the review tool for each page PR.
- **Starting the apps.** `webServer` in `playwright.config.ts` starts only the app the run needs, and reuses a server that is already running:
  - legacy (`visual:baseline`): `cd .. && nvm exec npm run dev`, which picks the root `.nvmrc`. Needs the root `npm ci` and `.env`.
  - v3 (`visual:compare`, `e2e`): `npm run dev`
  - Both use the same `BACKEND_URL` (prod API), so the content is the same.
  - Set `LEGACY_URL` / `V3_URL` to run against deployed apps; no local server is started then.
- **Size:** 21 fixtures → 38 URLs × 7 viewports = 266 tests. Use `--grep <fixture name>` while porting a page.
- **Viewports** (one per legacy range): 375, 560, 720, 900 and 1280 px wide, plus 1440 (sidebar visible) and 1680 (widescreen max-width).
- **Stability:**
  - `animations: 'disabled'`, `caret: 'hide'`
  - wait for `document.fonts.ready` and `networkidle`
  - `page.clock.setFixedTime(...)` for the diary "today"
  - `stylePath` to hide scrollbars
- **Masks for content that changes between loads:** random motto, tinder cards, iframes/embeds, ad/quiz SDKs.
- **Tolerance:** `maxDiffPixelRatio: 0.01` by default. Loosen it per route only with a comment explaining why; font hinting differs slightly between `next/font` and Google CSS.
- **Structural check.** Next to pixels, `expect(page.locator('main')).toMatchAriaSnapshot()` against the legacy snapshot catches missing text and links, and survives small pixel noise.
- **Agent loop:** while porting a page, the agent uses `next-dev-loop` + `agent-browser` on `:3001`, and runs `visual:compare --grep <page>` before calling the page done.
- **CI:** a manual `workflow_dispatch` job runs the comparison against deployed `dev.wir.by` legacy vs v3. Locally it's two `npm run dev`s.
