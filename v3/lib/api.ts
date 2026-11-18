// Backend endpoint registry, ported from legacy `constants/api.js`. Paths only (no host):
// lib/request.ts prefixes BACKEND_URL on the server, and the browser goes through the /api rewrite.
// `URLSearchParams` replaces `querystring`; path segments are URL-encoded (legacy didn't).

const API_URL = '/api';
const segment = encodeURIComponent;

export type Pagination = { skip?: number; take?: number };

const query = (params: Record<string, number | string | undefined>) => {
  const search = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      search.set(key, String(value));
    }
  });
  return search.toString();
};

export const api = {
  storage: {
    getMainPage: `${API_URL}/storage/main-page`,
    getSidebar: `${API_URL}/storage/sidebar`,
  },
  core: {
    subscribe: `${API_URL}/mail`,
  },
  publicArticle: {
    getBySlug: (slug: string) => `${API_URL}/articles/${segment(slug)}`,
  },
  articles: {
    getChunk: ({ skip = 0, take }: Pagination = {}) =>
      `${API_URL}/articles?${query({ skip, take })}`,
  },
  diary: {
    getByDay: (month: number | string, day: number | string) =>
      `${API_URL}/specials/diary/get/${segment(month)}/${segment(day)}`,
    getBySlug: (slug: string) => `${API_URL}/specials/diary/getBySlug/${segment(slug)}`,
    today: `${API_URL}/specials/diary/today`,
  },
  topics: {
    getArticles: (topic: string) => `${API_URL}/topics/articles/${segment(topic)}`,
  },
  tags: {
    getArticles: (tag: string) => `${API_URL}/tags/articles/${segment(tag)}`,
  },
  collections: {
    getOne: (slug: string) => `${API_URL}/collections/${segment(slug)}`,
  },
  games: {
    fortune: {
      get: (slug: string) => `${API_URL}/games/fortune/${segment(slug)}`,
      getCookie: (slug: string) => `${API_URL}/games/fortune/getCookie/${segment(slug)}`,
    },
    tinder: {
      get: (slug: string) => `${API_URL}/games/tinder/${segment(slug)}`,
      postStats: `${API_URL}/games/tinder/stats`,
    },
  },
} as const;
