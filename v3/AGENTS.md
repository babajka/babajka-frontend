<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# babajka-frontend v3

Rewrite of the legacy app in the repo root. The migration plan, phase checklists and the visual-parity setup are in [`README.md`](README.md); update its checkboxes when you finish a phase item.

## Rules

- Node 26 (`nvm use` in `v3/`). Run every command from `v3/`, not from the repo root.
- TypeScript strict, App Router, Server Components by default. Add `'use client'` only for real interactivity.
- Import with the `@/*` alias (`@/constants`, `@/utils/date`).
- Styling is Tailwind v4, CSS-first (`@theme` in `app/globals.css`). There is no `tailwind.config.js`.
- `cacheComponents`, `partialPrefetching`, `reactCompiler` and `typedRoutes` are on (see `next.config.ts`). Don't add manual `useMemo`/`useCallback` for performance.
- `/api`, `/auth` and `/test` are rewritten to `BACKEND_URL`, so don't put app routes under them.
- Pages live under `app/[lang]/`. Read the locale in Server Components with `getLang()` / `getT()` / `<Text>` from `@/lib/i18n/server`, and in client islands with `useT()` / `useLang()` from `@/lib/i18n/client`. Translation keys are typed (`DictKey`); refresh the dictionary with `npm run fetch-dict`. Client islands only get the `CLIENT_SCOPES` in `@/lib/i18n/shared` (add a scope there if an island needs it), and never import `@/lib/i18n/dict` (it's `server-only`).
- Fetch backend data through the cached loaders in `@/lib/loaders` (`'use cache'` + `cacheLife` + `cacheTag`), and map 404s with `orNotFound()` from `@/lib/request`. Add new endpoints to `@/lib/api`.
- Pages with the normal chrome go in `app/[lang]/(site)/`, games in `app/[lang]/(game)/`. Build links with `routes` from `@/lib/routes` and render them with `Link` / `ExternalLink` from `@/components/ui`. Page-specific header links go in the `@header` slot (`app/[lang]/(site)/@header/<route>/page.tsx`).
- Next 16 keeps the previous page mounted but hidden after navigation: no fixed `id`s in components (use `useId()`), and don't read `usePathname()` in always-rendered layout components (it makes every page dynamic; wrap such parts in `<Suspense>`).
- Before calling a page done, compare it with legacy: `npm run visual:baseline -- --grep <fixture>` then `npm run visual:compare -- --grep <fixture>` (see "Visual parity" in README.md).
- Style with the legacy tokens in `app/globals.css`: breakpoints `touch`/`tablet`/`tablet-lg`/`desktop`/`sidebar`/`wide` (mobile-first), `text-body`/`text-title`, `content-padding`, `z-*`, `card-*`. Combine classes with `cn()` from `@/lib/utils/cn`. Icons are in `@/components/icons`.
- Keep behaviour identical to legacy until a page passes visual parity. Port legacy unit tests along with the code they cover.

## Commands

```bash
npm run dev          # http://localhost:3001
npm run lint         # eslint + prettier --check
npm run typecheck    # next typegen + tsc --noEmit
npm run test         # vitest (unit), colocated *.test.ts(x)
npm run e2e          # playwright smoke tests (starts `npm run dev`)
BACKEND_URL=https://api.wir.by npm run build  # required: rewrites are fixed at build time; then `npm run start`
```

Deploy: `npm run deploy` publishes to Майстэрня at https://wir.skarb.click (see "Deploy to Майстэрня" in README.md).
