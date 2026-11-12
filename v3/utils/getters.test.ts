import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import {
  getLocalesBySlug,
  getLocalizedArticle,
  getLocalizedCollection,
  getLocalizedTag,
  localizeData,
  type RawArticle,
  type RawTag,
} from '@/utils/getters';

const TAG: RawTag = {
  _id: 't1',
  slug: 'kupala',
  topicSlug: 'personalities',
  topic: 'legacy-field',
  content: {
    name: { be: 'Янка Купала', en: 'Yanka Kupala' },
    subtitle: { be: 'паэт' },
    description: { be: 'апісанне' },
    image: '/api/files/x',
  },
};

const article = (overrides: Partial<RawArticle> = {}): RawArticle => ({
  _id: 'a1',
  type: 'text',
  locales: {
    be: { slug: 'kupala-be', title: 'Купала', text: { content: [] }, metrics: { views: 1 } },
    en: { slug: 'kupala-en', title: 'Kupala' },
  },
  ...overrides,
});

describe('utils/getters', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-11-12T12:00:00Z'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('getLocalizedTag', () => {
    it('should localize content fields by topic and drop `topic`', () => {
      expect(getLocalizedTag(TAG, 'en')).toEqual({
        id: 't1',
        slug: 'kupala',
        topicSlug: 'personalities',
        content: {
          name: 'Yanka Kupala',
          subtitle: 'паэт',
          description: 'апісанне',
          image: '/api/files/x',
        },
      });
    });
  });

  describe('getLocalizedArticle', () => {
    it('should return null for no article', () => {
      expect(getLocalizedArticle(null, 'be')).toBeNull();
    });

    it('should flatten the locale, drop metrics and default text', () => {
      const result = getLocalizedArticle(article(), 'en');

      expect(result).toMatchObject({ id: 'a1', type: 'text', slug: 'kupala-en', title: 'Kupala' });
      expect(result?.text).toEqual({});
      expect(result).not.toHaveProperty('metrics');
      expect(result).not.toHaveProperty('locales');
      expect(getLocalizedArticle(article(), 'be')?.text).toEqual({ content: [] });
    });

    it('should be published only when publishAt is in the past', () => {
      expect(getLocalizedArticle(article(), 'be')?.published).toBe(false);
      expect(
        getLocalizedArticle(article({ publishAt: '2026-11-01T00:00:00Z' }), 'be')?.published
      ).toBe(true);
      expect(
        getLocalizedArticle(article({ publishAt: '2027-01-01T00:00:00Z' }), 'be')?.published
      ).toBe(false);
    });

    it('should group tags by topic, with every topic present', () => {
      const { tagsByTopic } = getLocalizedArticle(article({ tags: [TAG] }), 'be')!;

      expect(Object.keys(tagsByTopic!)).toEqual([
        'themes',
        'locations',
        'times',
        'personalities',
        'authors',
        'brands',
      ]);
      expect(tagsByTopic!.personalities.map(t => t.id)).toEqual(['t1']);
      expect(tagsByTopic!.themes).toEqual([]);
      expect(getLocalizedArticle(article(), 'be')?.tagsByTopic).toBeNull();
    });

    it('should localize the collection and suggested articles', () => {
      const result = getLocalizedArticle(
        article({
          collection: {
            slug: 'bel-kino',
            name: { be: 'Кіно', en: 'Cinema' },
            description: { be: 'пра кіно' },
            articles: [article({ _id: 'a2' })],
          },
          suggestedArticles: { blocks: ['b'], data: { articles: [article({ _id: 'a3' })] } },
        }),
        'en'
      );

      expect(result?.collection).toMatchObject({
        slug: 'bel-kino',
        name: 'Cinema',
        description: 'пра кіно',
        articleIndex: 0,
      });
      expect(result?.collection?.articles?.[0]?.id).toBe('a2');
      expect(result?.suggestedArticles?.blocks).toEqual(['b']);
      expect(Object.keys(result?.suggestedArticles?.data.articles ?? {})).toEqual(['a3']);
    });
  });

  describe('getLocalizedCollection', () => {
    it('should default articles to null', () => {
      expect(
        getLocalizedCollection({ slug: 's', name: { be: 'n' }, description: {} }, 'ru').articles
      ).toBeNull();
    });
  });

  describe('localizeData', () => {
    it('should key topics, tags and articles by id, and keep latestArticles in order', () => {
      const data = localizeData(
        {
          topics: [{ _id: 'p1', slug: 'themes' }],
          tags: [TAG],
          articles: [article({ _id: 'x' })],
          latestArticles: [article({ _id: 'l2' }), article({ _id: 'l1' })],
        },
        'be'
      );

      expect(data.topics).toEqual({ p1: { id: 'p1', slug: 'themes' } });
      expect(Object.keys(data.tags ?? {})).toEqual(['t1']);
      expect(Object.keys(data.articles ?? {})).toEqual(['x']);
      expect(data.latestArticles?.map(a => a.id)).toEqual(['l2', 'l1']);
    });
  });

  describe('getLocalesBySlug', () => {
    it('should map each locale slug to its lang', () => {
      expect(getLocalesBySlug({ locales: { be: { slug: 'a-be' }, ru: { slug: 'a-ru' } } })).toEqual(
        { 'a-be': 'be', 'a-ru': 'ru' }
      );
    });
  });
});
