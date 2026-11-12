// Server-side requests to the backend, ported from legacy `utils/request.js` (`makeRequest`).
// - The server calls BACKEND_URL directly (legacy: "for requests from server we need to avoid
//   proxying"); the browser uses relative /api URLs through the rewrite.
// - `orNotFound` replaces legacy `catchServerSideErrors`: 404 → notFound(). Other errors propagate
//   to the nearest error boundary (error.tsx, Phase 3) instead of redirecting to /status/500.
import { notFound } from 'next/navigation';

// Same default as next.config.ts (dev API). In Docker it's set for both build and runtime.
export const BACKEND_URL = process.env.BACKEND_URL || 'https://api.wir.by';

// A hung backend must not hang the page: fail the request instead (legacy had no timeout).
const TIMEOUT_MS = 10_000;

export class RequestError extends Error {
  constructor(
    readonly url: string,
    readonly status: number
  ) {
    super(`Request to ${url} failed with ${status}`);
    this.name = 'RequestError';
  }
}

/** Duck-typed, because errors can lose their class when crossing a `'use cache'` boundary. */
export const isNotFoundError = (error: unknown) =>
  typeof error === 'object' && error !== null && 'status' in error && error.status === 404;

type RequestOptions = { method?: 'GET' | 'POST'; body?: unknown };

export const request = async <T = unknown>(
  path: string,
  { method = 'GET', body }: RequestOptions = {}
): Promise<T> => {
  const url = `${BACKEND_URL}${path}`;
  const response = await fetch(url, {
    method,
    headers: {
      accept: 'application/json',
      ...(body !== undefined && { 'content-type': 'application/json' }),
    },
    body: body === undefined ? undefined : JSON.stringify(body),
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });

  if (!response.ok) {
    throw new RequestError(url, response.status);
  }

  const contentType = response.headers.get('content-type');
  return (
    contentType?.includes('application/json') ? response.json() : response.text()
  ) as Promise<T>;
};

/** `const article = await orNotFound(getArticle(slug))`: a backend 404 renders the 404 page. */
export const orNotFound = async <T>(promise: Promise<T>): Promise<T> => {
  try {
    return await promise;
  } catch (error) {
    if (isNotFoundError(error)) {
      notFound();
    }
    throw error;
  }
};
