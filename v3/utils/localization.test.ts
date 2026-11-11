import { describe, expect, it } from 'vitest';

import type { Lang } from '@/constants';
import { localize, localizeArray, localizeFields, replaceLocale } from '@/utils/localization';

// Ported from legacy `utils/localization.test.js` (`getLocale` is not ported, see localization.ts).
describe('utils/localization', () => {
  describe('localize', () => {
    it('should return localized value for requested language', () => {
      const object = { be: 'прывітанне', ru: 'привет', en: 'hello' };
      expect(localize(object, 'be')).toBe('прывітанне');
      expect(localize(object, 'ru')).toBe('привет');
      expect(localize(object, 'en')).toBe('hello');
    });

    it('should fallback to default locale (be) if requested not found', () => {
      const object = { be: 'прывітанне' };
      expect(localize(object, 'en')).toBe('прывітанне');
    });

    it('should fallback to first value if default not found', () => {
      const object = { ru: 'привет', en: 'hello' };
      expect(localize(object, 'be')).toBe('привет');
    });

    it('should return null if object is null/undefined', () => {
      expect(localize(null, 'en')).toBeNull();
      expect(localize(undefined, 'en')).toBeUndefined();
    });

    it('should return undefined for empty object', () => {
      expect(localize({}, 'en')).toBeUndefined();
    });
  });

  describe('localizeArray', () => {
    type Item = { be: string; en: string };

    it('should localize array of items', () => {
      const localizeItem = (item: Item, lang: Lang) => ({
        ...item,
        title: item[lang as keyof Item],
      });
      const items: Item[] = [
        { be: 'тарожкі', en: 'bread' },
        { be: 'малако', en: 'milk' },
      ];
      const result = localizeArray(localizeItem)(items, 'en');
      expect(result?.[0].title).toBe('bread');
      expect(result?.[1].title).toBe('milk');
    });

    it('should return undefined if items is undefined', () => {
      const localizeItem = (item: Item) => item;
      expect(localizeArray(localizeItem)(undefined, 'en')).toBeUndefined();
    });

    it('should return undefined if items is null', () => {
      const localizeItem = (item: Item) => item;
      expect(localizeArray(localizeItem)(null, 'en')).toBeUndefined();
    });
  });

  describe('localizeFields', () => {
    it('should localize specified fields', () => {
      const object = {
        title: { be: 'загаловак', en: 'title' },
        description: { be: 'апісанне', en: 'desc' },
      };
      const result = localizeFields(['title', 'description'])(object, 'en');
      expect(result).toEqual({ title: 'title', description: 'desc' });
    });

    it('should keep fields that are not localized', () => {
      const object = { slug: 'kupala', title: { be: 'Купала' } };
      const result = localizeFields(['title'])(object, 'en');
      expect(result).toEqual({ slug: 'kupala', title: 'Купала' });
    });

    it('should return object as is if null', () => {
      const result = localizeFields(['title'])(null, 'en');
      expect(result).toBeNull();
    });

    it('should handle missing fields gracefully', () => {
      const object = { title: { be: 'загаловак' } };
      const result = localizeFields(['title', 'missing'])(object, 'en');
      expect(result).toEqual({ title: 'загаловак', missing: undefined });
    });
  });

  describe('replaceLocale', () => {
    it('should replace locale in URL', () => {
      expect(replaceLocale('/ru/article/slug', 'ru')).toBe('/article/slug');
      expect(replaceLocale('/en/article/slug', 'en')).toBe('/article/slug');
    });

    it('should handle URL without locale', () => {
      expect(replaceLocale('/article/slug', 'be')).toBe('/article/slug');
    });

    it('should only remove a leading locale segment', () => {
      expect(replaceLocale('/article/enigma', 'en')).toBe('/article/enigma');
      expect(replaceLocale('/article/belarus', 'be')).toBe('/article/belarus');
      expect(replaceLocale('/be/article/belarus', 'be')).toBe('/article/belarus');
      expect(replaceLocale('/english', 'en')).toBe('/english');
    });

    it('should handle a bare locale, query and hash', () => {
      expect(replaceLocale('/ru', 'ru')).toBe('/');
      expect(replaceLocale('/ru?x=1', 'ru')).toBe('/?x=1');
      expect(replaceLocale('/en#top', 'en')).toBe('/#top');
    });
  });
});
