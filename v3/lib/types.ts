// Backend response types. Only what's used so far; each page adds its types when it's ported
// (Phase 4), from the real responses, not from legacy PropTypes.
import type { Topic } from '@/constants';
import type { RawArticle, RawBlocksData, RawCollection, RawTag } from '@/utils/getters';
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

/*
 *               MAIN PAGE
 */

export type ArticleRef = { id?: string; frozen?: boolean };

export type Block =
  | { type: 'diary' }
  | { type: 'banner'; banner: string }
  | { type: 'featured'; frozen: boolean; articleId?: string }
  | { type: 'list'; articles: string[] }
  | { type: 'latestArticles'; articlesIds: ArticleRef[] }
  | { type: 'articlesByTag2'; tagId: string; articlesIds: string[] }
  | { type: 'articlesByTag3'; tagId: string; articlesIds: string[] }
  | { type: 'tagsByTopic'; topicSlug: Topic; style: '1-2' | '2-1'; tagsIds: string[] };

export type MainPage = { blocks: Block[]; data: RawBlocksData };

/*
 *               DIARY
 */

export type DiaryDay = { month: string; day: string; slug: string };

export type DiaryEntry = DiaryDay & {
  year: number;
  date?: number;
  author?: RawTag;
  text?: { content?: unknown };
};

export type DiaryResponse = { data: DiaryEntry; prev?: DiaryDay; next?: DiaryDay };

/*
 *               LISTINGS
 */

export type TopicResponse = {
  tags: (RawTag & { slug: string })[];
  articles: RawArticle[];
  /** Article ids by tag slug. */
  articlesByTag: Record<string, string[]>;
};

export type TagResponse = { tag: RawTag; articles: RawArticle[] };

export type CollectionResponse = { collection: RawCollection };
