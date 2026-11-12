import { NextResponse, type NextRequest } from 'next/server';

import { LOCALE_COOKIE_NAME } from '@/constants';
import { getLocaleRedirect } from '@/lib/locale-redirect';

// 1. Locale redirects, ported from the legacy Express server (see lib/locale-redirect.ts).
// 2. NOINDEX (set for the Майстэрня preview in the Dockerfile): X-Robots-Tag on every response.
//    - The <meta name="robots"> in app/[lang]/layout.tsx only covers HTML pages.
//    - `headers()` in next.config.ts is not applied to the external /api rewrites: the response
//      carries the backend's headers. So for backend paths this proxy does the rewrite itself
//      (same target as next.config.ts `rewrites()`), because only a response created here can
//      carry the header. Without NOINDEX the config rewrites handle /api.

const NOINDEX = process.env.NOINDEX === 'true';
const BACKEND_URL = process.env.BACKEND_URL || 'https://api.wir.by';
const BACKEND_PATH = /^\/(api|auth|test)(\/|$)/;

const respond = (request: NextRequest) => {
  const { pathname, search } = request.nextUrl;

  const target = getLocaleRedirect(
    pathname,
    search,
    request.cookies.get(LOCALE_COOKIE_NAME)?.value
  );
  if (target) {
    // 302, like Express `res.redirect` in legacy
    return NextResponse.redirect(new URL(target, request.url), 302);
  }

  if (NOINDEX && BACKEND_PATH.test(pathname)) {
    return NextResponse.rewrite(new URL(`${pathname}${search}`, BACKEND_URL));
  }

  return NextResponse.next();
};

export function proxy(request: NextRequest) {
  const response = respond(request);
  if (NOINDEX) {
    response.headers.set('X-Robots-Tag', 'noindex, nofollow');
  }
  return response;
}
