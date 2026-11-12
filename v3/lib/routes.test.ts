import { describe, expect, it } from 'vitest';

import { routes, switchLocale } from '@/lib/routes';

// Same URLs as legacy routes.js (next-routes), under /{lang}.
describe('lib/routes', () => {
  it('should build the legacy routes', () => {
    expect(routes.main('be')).toBe('/be');
    expect(routes.about('ru')).toBe('/ru/about');
    expect(routes.article('en', 'kupala-kolas')).toBe('/en/article/kupala-kolas');
    expect(routes.topic('be', 'personalities')).toBe('/be/topic/personalities');
    expect(routes.tag('be', 'personalities', 'kupala')).toBe('/be/topic/personalities/tag/kupala');
    expect(routes.collection('be', 'bel-kino')).toBe('/be/collection/bel-kino');
    expect(routes.diary('be')).toBe('/be/diary');
    expect(routes.diary('be', 'f31126')).toBe('/be/diary/f31126');
    expect(routes.status('en', 404)).toBe('/en/status/404');
  });

  it('should encode slugs', () => {
    expect(routes.article('be', 'a b/c')).toBe('/be/article/a%20b%2Fc');
  });

  describe('switchLocale', () => {
    it('should replace the first segment', () => {
      expect(switchLocale('/be/article/x', 'ru')).toBe('/ru/article/x');
      expect(switchLocale('/be', 'en')).toBe('/en');
    });

    it('should handle the root', () => {
      expect(switchLocale('/', 'ru')).toBe('/ru');
    });
  });
});
