// On-demand revalidation: the backend (or an editor) calls this on publish, so cached pages
// update right away instead of after their `cacheLife`.
//
//   curl -X POST https://<site>/revalidate \
//     -H "authorization: Bearer $REVALIDATE_SECRET" -H 'content-type: application/json' \
//     -d '{"tags": ["article:kupala-kolas", "articles"]}'
//
// Not under /api, /auth or /test: those are proxied to the backend (next.config.ts).
// Disabled (404) when REVALIDATE_SECRET is not set.
import { createHash, timingSafeEqual } from 'node:crypto';

import { revalidateTag } from 'next/cache';

const MAX_TAGS = 50;

// Constant-time comparison, so response timing doesn't leak the secret. Hashing first gives
// equal-length buffers, as `timingSafeEqual` requires, without leaking the secret's length.
const digest = (value: string) => createHash('sha256').update(value).digest();

const isAuthorized = (request: Request, secret: string) =>
  timingSafeEqual(digest(request.headers.get('authorization') ?? ''), digest(`Bearer ${secret}`));

export async function POST(request: Request) {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret) {
    return new Response(null, { status: 404 });
  }
  if (!isAuthorized(request, secret)) {
    return Response.json({ error: 'unauthorized' }, { status: 401 });
  }

  const body: unknown = await request.json().catch(() => null);
  const tags =
    body && typeof body === 'object' && 'tags' in body && Array.isArray(body.tags) ? body.tags : [];
  const valid = tags.filter((tag): tag is string => typeof tag === 'string' && tag.length > 0);
  if (valid.length === 0 || valid.length > MAX_TAGS) {
    return Response.json(
      { error: `expected {"tags": [...]} with 1–${MAX_TAGS} strings` },
      { status: 400 }
    );
  }

  // 'max': visitors get the cached page while it regenerates in the background.
  valid.forEach(tag => revalidateTag(tag, 'max'));
  return Response.json({ revalidated: valid });
}
