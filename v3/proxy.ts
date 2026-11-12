import { NextResponse, type NextRequest } from 'next/server';

// Public previews (Майстэрня: NOINDEX=true in the Dockerfile) must not be indexed.
// - The <meta name="robots"> in app/layout.tsx only covers HTML pages.
// - `headers()` in next.config.ts is not applied to the external /api rewrites: the response
//   carries the backend's headers.
// So the header is set here, on every response. For backend paths this proxy also does the rewrite
// itself (same target as next.config.ts `rewrites()`), because only a response created here can
// carry the header. Without NOINDEX it does nothing and the config rewrites handle /api.
// Phase 2 adds the locale redirects here.

const NOINDEX = process.env.NOINDEX === 'true';
const BACKEND_URL = process.env.BACKEND_URL || 'https://api.wir.by';
const BACKEND_PATH = /^\/(api|auth|test)(\/|$)/;

export function proxy(request: NextRequest) {
  if (!NOINDEX) {
    return NextResponse.next();
  }

  const { pathname, search } = request.nextUrl;
  const response = BACKEND_PATH.test(pathname)
    ? NextResponse.rewrite(new URL(`${pathname}${search}`, BACKEND_URL))
    : NextResponse.next();
  response.headers.set('X-Robots-Tag', 'noindex, nofollow');
  return response;
}
