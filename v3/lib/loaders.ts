// Cached data loaders, one per resource. Legacy fetched the backend on every request
// (`getServerSideProps`); here results are cached (`'use cache'`) and revalidated by time
// (`cacheLife`) or on demand by tag (`cacheTag` + POST /revalidate).
//
// Lifetimes:
// - `hours`: published content (article, topic, tag, collection): rarely changes after publishing,
//   and the backend can revalidate it right away by tag.
// - `minutes`: pages that change with new publications or by date (main page, sidebar, diary).
//
// Loaders throw `RequestError` on backend errors. Pages map a 404 with `orNotFound()`
// (lib/request.ts). Errors are not cached.
import { cacheLife, cacheTag } from 'next/cache';

import type { Lang, Topic } from '@/constants';
import { api, type Pagination } from '@/lib/api';
import { CACHE_TAGS } from '@/lib/cache-tags';
import { request } from '@/lib/request';
import type { ArticlesChunk, DiaryResponse, MainPage } from '@/lib/types';
import { localizeData } from '@/utils/getters';

// Response types of the endpoints below are added with the pages that use them (Phase 4).
type Unported = unknown;

export const getArticle = async (slug: string) => {
  'use cache';
  cacheLife('hours');
  cacheTag(CACHE_TAGS.articles, CACHE_TAGS.article(slug));
  return request<Unported>(api.publicArticle.getBySlug(slug));
};

export const getArticles = async (pagination: Pagination) => {
  'use cache';
  cacheLife('minutes');
  cacheTag(CACHE_TAGS.articles);
  return request<ArticlesChunk>(api.articles.getChunk(pagination));
};

/**
 * The main page for one locale. Localizing is cached with the data: it reads the current time to
 * mark published articles, which a prerender only allows inside a cache.
 */
export const getLocalizedMainPage = async (lang: Lang) => {
  'use cache';
  cacheLife('minutes');
  cacheTag(CACHE_TAGS.articles, CACHE_TAGS.mainPage);
  const { blocks, data } = await request<MainPage>(api.storage.getMainPage);
  return { blocks, data: localizeData(data, lang) };
};

export const getSidebar = async () => {
  'use cache';
  cacheLife('minutes');
  cacheTag(CACHE_TAGS.sidebar);
  return request<Unported>(api.storage.getSidebar);
};

export const getTopic = async (topic: Topic) => {
  'use cache';
  cacheLife('hours');
  cacheTag(CACHE_TAGS.articles, CACHE_TAGS.topic(topic));
  return request<Unported>(api.topics.getArticles(topic));
};

export const getTag = async (tag: string) => {
  'use cache';
  cacheLife('hours');
  cacheTag(CACHE_TAGS.articles, CACHE_TAGS.tag(tag));
  return request<Unported>(api.tags.getArticles(tag));
};

export const getCollection = async (slug: string) => {
  'use cache';
  cacheLife('hours');
  cacheTag(CACHE_TAGS.articles, CACHE_TAGS.collection(slug));
  return request<Unported>(api.collections.getOne(slug));
};

/**
 * A diary entry by slug, by day, or for today (backend date). Today's entry changes at midnight,
 * so it gets the short lifetime.
 */
export const getDiary = async (by: { slug: string } | { month: number; day: number } | 'today') => {
  'use cache';
  cacheLife('minutes');
  cacheTag(CACHE_TAGS.articles, CACHE_TAGS.diary);
  if (by === 'today') {
    return request<DiaryResponse>(api.diary.today);
  }
  return request<DiaryResponse>(
    'slug' in by ? api.diary.getBySlug(by.slug) : api.diary.getByDay(by.month, by.day)
  );
};
