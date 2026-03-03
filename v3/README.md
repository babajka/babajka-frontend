# babajka-frontend v3

Migration of babajka-frontend from `next@10` + React 16 to `next@16` + React 18 with TypeScript, Tailwind, and App Router.

## Target Stack

- Node v24
- Next.js 16
- React 18
- TypeScript
- Tailwind CSS
- App Router (Server Components)
- Vitest for testing

## Stack / Features Checklist

- [x] TypeScript
- [x] Tailwind CSS
- [x] Next.js App Router
- [ ] Next Image Component
- [x] @next/fonts
- [ ] next i18n support
- [x] Server Components
- [x] Vitest testing

## Getting Started

```
cd v3
nvm use
npm i
npm run dev
```

## Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run prettify     # Run Prettier
npm run test         # Run Vitest tests
npm run test:ui      # Run Vitest with UI
```

---

# Migration Plan

**Important:** All work happens inside `v3/` folder first. After full migration is complete and verified, `v3/` contents are copied to root.

---

## Phase 0: Legacy App - Add Tests (Vitest)

Add tests to legacy app (`root/`) to ensure functionality is preserved during migration.

- [ ] Install vitest, @testing-library/react, @testing-library/jest-dom, jsdom
- [ ] Add test script: `vitest`
- [ ] Configure `vitest.config.ts`
- [ ] Write unit tests for `utils/` (date formatting, API helpers)
- [ ] Write component tests for key UI (Button, Link, Image)
- [ ] Write page tests for main pages (index, article, collection)
- [ ] Run tests: `npm run test` - ensure all pass
- [ ] Add test step to CI workflow

---

## Phase 1: Setup v3 Project

Initialize the modern stack inside `v3/` folder.

- [ ] Update `v3/package.json`:
  - Node: `~24`, npm: `~10`
  - Next.js 16, React 18
  - TypeScript
  - Tailwind CSS
  - Vitest + testing libraries
  - All scripts: `dev`, `build`, `start`, `lint`, `prettify`, `test`, `test:ui`
- [ ] Update `v3/.nvmrc` to `24`
- [ ] Configure `v3/tsconfig.json` with path aliases
- [ ] Configure `v3/tailwind.config.js`
- [ ] Configure `v3/postcss.config.js`
- [ ] Add `v3/.eslintrc.json`
- [ ] Add `v3/.prettierrc.js`
- [ ] Add `v3/vitest.config.ts`
- [ ] Add `v3/next.config.js` (App Router enabled)
- [ ] Install dependencies: `cd v3 && npm i`
- [ ] Verify dev server runs: `npm run dev`

---

## Phase 2: Migrate Pages (Pages → App Router)

Migrate all pages from `pages/` to `v3/app/`.

- [ ] Migrate `pages/index.js` → `v3/app/page.tsx`
- [ ] Migrate `pages/about.js` → `v3/app/about/page.tsx`
- [ ] Migrate `pages/article.js` → `v3/app/article/[slug]/page.tsx`
- [ ] Migrate `pages/collection.js` → `v3/app/collection/page.tsx`
- [ ] Migrate `pages/topic.js` → `v3/app/topic/[slug]/page.tsx`
- [ ] Migrate `pages/tag.js` → `v3/app/tag/[slug]/page.tsx`
- [ ] Migrate `pages/diary.js` → `v3/app/diary/page.tsx`
- [ ] Migrate `pages/status.js` → `v3/app/status/page.tsx`
- [ ] Migrate `pages/game/tinder.js` → `v3/app/game/tinder/page.tsx`
- [ ] Migrate `pages/game/ny2021.js` → `v3/app/game/ny2021/page.tsx`
- [ ] Migrate `_app.js` → `v3/app/layout.tsx` (providers, globals)
- [ ] Migrate `_document.js` → `v3/app/layout.tsx` (fonts, metadata)
- [ ] Migrate `_error.js` → `v3/app/error.tsx`

Convert `getStaticProps`/`getServerSideProps` → async server components.

---

## Phase 3: Migrate Components (JS → TSX + Tailwind)

Migrate all components from `components/` to `v3/components/` with Tailwind.

- [ ] Create component structure in `v3/components/`
- [ ] Migrate `components/common/Button.js` → `v3/components/Button.tsx`
- [ ] Migrate `components/common/Link.js` → `v3/components/Link.tsx`
- [ ] Migrate `components/common/Image.js` → `v3/components/Image.tsx`
- [ ] Migrate `components/common/ui/Icon.js` → `v3/components/Icon.tsx`
- [ ] Migrate `components/layout/Header.js` → `v3/components/Header.tsx`
- [ ] Migrate `components/layout/Footer.js` → `v3/components/Footer.tsx`
- [ ] Migrate all other components from `components/common/`
- [ ] Migrate all components from `components/layout/`
- [ ] Migrate all components from `components/social/`
- [ ] Migrate all components from `features/`

Convert PropTypes → TypeScript interfaces, SCSS → Tailwind classes.

---

## Phase 4: Migrate Hooks, Utils & Constants

- [ ] Migrate `hooks/useToggleSidebar.js` → `v3/hooks/useToggleSidebar.ts`
- [ ] Migrate `hooks/useBoolean.js` → `v3/hooks/useBoolean.ts`
- [ ] Migrate `hooks/useWindowWidth.js` → `v3/hooks/useWindowWidth.ts`
- [ ] Migrate `utils/` → `v3/lib/` as TypeScript
- [ ] Migrate `constants/` → `v3/constants/` with typing

---

## Phase 5: Migrate Data Fetching

- [ ] Analyze API calls in current `pages/`
- [ ] Migrate data fetching logic to server components or API routes
- [ ] Keep compatible: google-spreadsheet, date-fns, classnames, js-cookie, lodash

---

## Phase 6: Cleanup v3 & Verify

- [ ] Run `npm run lint` - fix all errors
- [ ] Run `npm run test` - ensure all tests pass
- [ ] Verify build: `npm run build`
- [ ] Test SSR with local backend
- [ ] Verify all pages render correctly

---

## Phase 7: Copy v3 to Root

After v3 is fully working, copy contents to root.

- [ ] Copy all files from `v3/` to root `/`
- [ ] Update `package.json` scripts if needed (keep existing deployment scripts)
- [ ] Update `.nvmrc` at root
- [ ] Verify root app works: `npm run dev`
- [ ] Run full CI pipeline: `npm run lint && npm run test && npm run build`
- [ ] Remove `v3/` folder

---

## Phase 8: Remove Legacy Files

- [ ] Remove `pages/`
- [ ] Remove `components/`
- [ ] Remove `styles/`
- [ ] Remove `hooks/`
- [ ] Remove `utils/`
- [ ] Remove `lib/`
- [ ] Remove `server.js`
- [ ] Remove `routes.js`
- [ ] Remove `.babelrc`
- [ ] Remove `.eslintrc.js`
- [ ] Remove `stylelint.config.js`
- [ ] Remove legacy dependencies from `package.json`

---


