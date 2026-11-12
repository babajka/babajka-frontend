// Minimal typed client for the babajka backend. Seed of Phase 2 `lib/api.ts` + `lib/request.ts`.
// Runs on the server only: it fetches BACKEND_URL directly (no CORS, no proxy).
import type { Localized } from '@/utils/localization';

// Same default as `next.config.ts` (dev API). In Docker it's set for both build and runtime.
export const BACKEND_URL = process.env.BACKEND_URL || 'https://api.wir.by';

export class RequestError extends Error {
  constructor(
    readonly url: string,
    readonly status: number
  ) {
    super(`Request to ${url} failed with ${status}`);
    this.name = 'RequestError';
  }
}

const request = async <T>(path: string): Promise<T> => {
  const url = `${BACKEND_URL}${path}`;
  const response = await fetch(url, { headers: { accept: 'application/json' } });
  if (!response.ok) {
    throw new RequestError(url, response.status);
  }
  return response.json() as Promise<T>;
};

/** One locale of an article, as `GET /api/articles` returns it. */
export type ArticleLocale = {
  slug: string;
  title: string;
  subtitle?: string;
};

export type Article = {
  _id: string;
  publishAt: string;
  locales: Localized<ArticleLocale>;
  images?: { horizontal?: string; vertical?: string };
};

export type ArticlesChunk = { data: Article[]; total: number };

/** Latest published articles. Legacy: `constants/api.js` → `articles.getChunk`. */
export const getLatestArticles = (take: number) =>
  request<ArticlesChunk>(`/api/articles?${new URLSearchParams({ skip: '0', take: String(take) })}`);
