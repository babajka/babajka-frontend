import { describe, expect, it } from 'vitest';

import { api } from '@/lib/api';

// Same URLs as legacy constants/api.js.
describe('lib/api', () => {
  it('should build static endpoints', () => {
    expect(api.storage.getMainPage).toBe('/api/storage/main-page');
    expect(api.storage.getSidebar).toBe('/api/storage/sidebar');
    expect(api.core.subscribe).toBe('/api/mail');
    expect(api.diary.today).toBe('/api/specials/diary/today');
    expect(api.games.tinder.postStats).toBe('/api/games/tinder/stats');
  });

  it('should build endpoints with params', () => {
    expect(api.publicArticle.getBySlug('kupala-kolas')).toBe('/api/articles/kupala-kolas');
    expect(api.diary.getByDay(11, 9)).toBe('/api/specials/diary/get/11/9');
    expect(api.diary.getBySlug('f31126')).toBe('/api/specials/diary/getBySlug/f31126');
    expect(api.topics.getArticles('personalities')).toBe('/api/topics/articles/personalities');
    expect(api.tags.getArticles('kupala')).toBe('/api/tags/articles/kupala');
    expect(api.collections.getOne('bel-kino')).toBe('/api/collections/bel-kino');
    expect(api.games.fortune.get('ny2021')).toBe('/api/games/fortune/ny2021');
    expect(api.games.fortune.getCookie('ny2021')).toBe('/api/games/fortune/getCookie/ny2021');
    expect(api.games.tinder.get('tinder')).toBe('/api/games/tinder/tinder');
  });

  it('should encode path segments', () => {
    expect(api.publicArticle.getBySlug('a/b?c')).toBe('/api/articles/a%2Fb%3Fc');
  });

  it('should build the articles query like querystring did', () => {
    expect(api.articles.getChunk()).toBe('/api/articles?skip=0');
    expect(api.articles.getChunk({ take: 2 })).toBe('/api/articles?skip=0&take=2');
    expect(api.articles.getChunk({ skip: 10, take: 5 })).toBe('/api/articles?skip=10&take=5');
  });
});
