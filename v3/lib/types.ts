// Backend response types. Only what's used so far; each page adds its types when it's ported
// (Phase 4), from the real responses, not from legacy PropTypes.
import type { Localized } from '@/utils/localization';

/** One locale of an article, as the article lists return it. */
export type ArticleLocale = {
  slug: string;
  title: string;
  subtitle?: string;
};

export type ArticleSummary = {
  _id: string;
  publishAt?: string;
  locales: Localized<ArticleLocale>;
  images?: { horizontal?: string; vertical?: string };
};

export type ArticlesChunk = { data: ArticleSummary[]; total: number };
