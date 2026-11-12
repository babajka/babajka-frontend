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
