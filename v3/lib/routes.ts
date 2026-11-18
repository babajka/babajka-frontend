// URL builders for the legacy routes (routes.js / next-routes), all under `/{lang}`.
//
// typedRoutes only accepts links to routes that exist. Most pages arrive in Phase 4, so the
// builders return `Route` via a cast; drop the casts as the pages land and tsc starts checking them.
import type { Route } from 'next';

import type { Lang, Topic } from '@/constants';

const route = (path: string) => path as Route;

export const routes = {
  main: (lang: Lang) => route(`/${lang}`),
  about: (lang: Lang) => route(`/${lang}/about`),
  article: (lang: Lang, slug: string) => route(`/${lang}/article/${encodeURIComponent(slug)}`),
  topic: (lang: Lang, topic: Topic) => route(`/${lang}/topic/${topic}`),
  tag: (lang: Lang, topic: Topic, tag: string) =>
    route(`/${lang}/topic/${topic}/tag/${encodeURIComponent(tag)}`),
  collection: (lang: Lang, slug: string) =>
    route(`/${lang}/collection/${encodeURIComponent(slug)}`),
  diary: (lang: Lang, slug?: string) =>
    route(slug ? `/${lang}/diary/${encodeURIComponent(slug)}` : `/${lang}/diary`),
  status: (lang: Lang, code: 404 | 500) => route(`/${lang}/status/${code}`),
};

/** The same page in another locale: replaces the first path segment (legacy getLocaleSwitchUrl). */
export const switchLocale = (pathname: string, lang: Lang) => {
  const parts = pathname.split('/');
  parts[1] = lang;
  return route(parts.join('/') || `/${lang}`);
};
