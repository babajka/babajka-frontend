// Locale routing, ported from the legacy Express server (`server.js`):
//   `/`                        → `/{cookie || be}`
//   a path without a locale    → `/{cookie || be}{path}`  (e.g. `/about` → `/be/about`)
//   a cookie locale different from the path's locale → the same path in the cookie locale
//   static paths are skipped
// Differences from legacy, both to avoid needless redirects:
// - `/` goes to `/be`, not `/be/` (Next would redirect that trailing slash again);
// - the query string is kept when switching to the cookie locale (legacy dropped it).
import { DEFAULT_LOCALE, isLang, type Lang } from '@/constants';

// First path segments that are not pages: Next internals, the backend proxy (/api, /auth, /test,
// see next.config.ts) and the revalidation endpoint. Legacy STATIC_PATHS was ['static', '_next'].
const STATIC_SEGMENTS = new Set(['_next', 'api', 'auth', 'test', 'revalidate', 'static']);

// Files at the root (favicon.ico, robots.txt, sitemap.xml, …) are not localized.
const isFile = (pathname: string) => /\.[a-z0-9]+$/i.test(pathname);

/** Returns the path (with query) to redirect to, or `null` to continue. */
export const getLocaleRedirect = (
  pathname: string,
  search: string,
  cookieLocale: string | undefined
): string | null => {
  const userLocale: Lang | null = isLang(cookieLocale) ? cookieLocale : null;
  const locale = userLocale ?? DEFAULT_LOCALE;

  if (pathname === '/') {
    return `/${locale}${search}`;
  }

  const [, first = ''] = pathname.split('/');
  if (STATIC_SEGMENTS.has(first) || isFile(pathname)) {
    return null;
  }

  if (!isLang(first)) {
    // missed locale, add it
    return `/${locale}${pathname}${search}`;
  }

  if (userLocale && first !== userLocale) {
    // switch to the user's preferred locale
    return `/${userLocale}${pathname.slice(first.length + 1)}${search}`;
  }

  return null;
};
