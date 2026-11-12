// Backend → view transforms for articles, tags and collections. Ported from legacy
// `utils/getters.js`, without lodash (`keyBy` → Object.fromEntries).
// Input types are deliberately loose: the exact backend types are added per page in Phase 4.
import { isBefore, parseISO } from 'date-fns';

import { TOPICS, type Lang, type Topic } from '@/constants';
import { localize, localizeFields, type Localized } from '@/utils/localization';

type Raw = Record<string, unknown>;

const keyBy = <T extends { id: string }>(items: T[]): Record<string, T> =>
  Object.fromEntries(items.map(item => [item.id, item]));

const isPresent = <T>(value: T | null | undefined): value is T => value != null;

/*
 *               TYPES
 */

export type RawTag = Raw & { _id: string; topicSlug: Topic; content: Raw; topic?: unknown };

export type RawCollection = {
  slug: string;
  cover?: string;
  name: Localized;
  description: Localized;
  articles?: RawArticle[] | null;
  articleIndex?: number;
};

export type RawBlocksData = {
  topics?: { _id: string; slug: string }[];
  tags?: RawTag[];
  articles?: RawArticle[];
  latestArticles?: RawArticle[];
};

export type RawSuggested = { blocks: unknown; data: RawBlocksData };

export type RawArticle = Raw & {
  _id: string;
  locales: Localized<Raw & { text?: Raw; metrics?: unknown }>;
  collection?: RawCollection | null;
  publishAt?: string;
  tags?: RawTag[] | null;
  suggestedArticles?: RawSuggested | null;
};

export type LocalizedTag = Raw & { id: string; topicSlug: Topic; content: Raw };

export type LocalizedCollection = {
  slug: string;
  cover?: string;
  articleIndex: number;
  name: string | undefined;
  description: string | undefined;
  articles: (LocalizedArticle | null)[] | null;
};

export type LocalizedBlocksData = {
  topics?: Record<string, { id: string; slug: string }>;
  tags?: Record<string, LocalizedTag>;
  articles?: Record<string, LocalizedArticle>;
  latestArticles?: LocalizedArticle[];
};

export type LocalizedSuggested = { blocks: unknown; data: LocalizedBlocksData };

export type LocalizedArticle = Raw & {
  id: string;
  text: Raw;
  publishAt?: string;
  collection: LocalizedCollection | null;
  published: boolean;
  tagsByTopic: Record<Topic, LocalizedTag[]> | null;
  suggestedArticles: LocalizedSuggested | null;
};

/*
 *               TAGS
 */

const LOCALIZE_TAG_CONTENT: Record<Topic, (content: Raw, lang: Lang) => Raw | null | undefined> = {
  themes: localizeFields(['title']),
  locations: localizeFields(['title']),
  times: localizeFields(['title']),
  personalities: localizeFields(['name', 'subtitle', 'description']),
  brands: localizeFields(['title']),
  authors: localizeFields(['firstName', 'lastName', 'bio']),
};

// WARNING: drops `topic` (legacy TODO: remove `topic` on the backend, use `topicSlug`)
export const getLocalizedTag = (
  { _id: id, topicSlug, content, topic: _, ...rest }: RawTag,
  lang: Lang
): LocalizedTag => ({
  ...rest,
  id,
  topicSlug,
  content: LOCALIZE_TAG_CONTENT[topicSlug](content, lang) ?? {},
});

const getLocalizedTags = (tags: RawTag[], lang: Lang) =>
  tags.map(tag => getLocalizedTag(tag, lang));

const getInitTagsByTopic = () =>
  Object.fromEntries(TOPICS.map(topic => [topic, []])) as unknown as Record<Topic, LocalizedTag[]>;

/*
 *               ARTICLE
 */

/** `{ [slug]: lang }` for the article's locales (used to switch language on an article). */
export const getLocalesBySlug = ({ locales }: { locales: Localized<{ slug: string }> }) =>
  Object.fromEntries(
    Object.entries(locales).flatMap(([lang, locale]) => (locale ? [[locale.slug, lang]] : []))
  ) as Record<string, Lang>;

export function getLocalizedArticle(
  article: RawArticle | null | undefined,
  lang: Lang
): LocalizedArticle | null {
  if (!article) {
    return null;
  }
  const {
    _id: id,
    locales,
    collection = null,
    publishAt,
    tags = null,
    suggestedArticles = null,
    ...rest
  } = article;
  const { text, metrics: _, ...localized } = localize(locales, lang) ?? {};

  // TODO (legacy): implement on the backend.
  // WARNING: there are no tags in `prev` & `next` articles in a collection
  const tagsByTopic =
    tags &&
    getLocalizedTags(tags, lang).reduce((acc, tag) => {
      acc[tag.topicSlug].push(tag);
      return acc;
    }, getInitTagsByTopic());

  return {
    ...rest,
    ...localized,
    text: text || {},
    id,
    publishAt,
    collection: collection && getLocalizedCollection(collection, lang),
    published: !!publishAt && isBefore(parseISO(publishAt), new Date()),
    tagsByTopic,
    suggestedArticles: getLocalizedSuggested(suggestedArticles, lang),
  };
}

export const getLocalizedArticles = (
  articles: RawArticle[] | null | undefined,
  lang: Lang
): (LocalizedArticle | null)[] | undefined => articles?.map(a => getLocalizedArticle(a, lang));

/*
 *               COLLECTION
 */

export function getLocalizedCollection(
  { slug, cover, name, description, articles, articleIndex = 0 }: RawCollection,
  lang: Lang
): LocalizedCollection {
  return {
    slug,
    cover,
    articleIndex,
    name: localize(name, lang),
    description: localize(description, lang),
    articles: articles?.map(a => getLocalizedArticle(a, lang)) || null,
  };
}

/*
 *               BLOCKS DATA (main page, suggested articles)
 */

const getTopic = ({ _id: id, slug }: { _id: string; slug: string }) => ({ id, slug });

/** Localizes blocks data, keyed by id, except `latestArticles`, which keeps its order. */
export function localizeData(data: RawBlocksData, lang: Lang): LocalizedBlocksData {
  const articles = (list: RawArticle[]) =>
    (getLocalizedArticles(list, lang) ?? []).filter(isPresent);
  return {
    ...(data.topics && { topics: keyBy(data.topics.map(getTopic)) }),
    ...(data.tags && { tags: keyBy(getLocalizedTags(data.tags, lang)) }),
    ...(data.articles && { articles: keyBy(articles(data.articles)) }),
    ...(data.latestArticles && { latestArticles: articles(data.latestArticles) }),
  };
}

export function getLocalizedSuggested(
  articles: RawSuggested | null | undefined,
  lang: Lang
): LocalizedSuggested | null {
  return articles
    ? {
        blocks: articles.blocks,
        data: localizeData(articles.data, lang),
      }
    : null;
}
