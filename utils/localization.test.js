import { describe, it, expect } from 'vitest';
import {
  localize,
  localizeArray,
  localizeFields,
  getLocale,
  replaceLocale,
} from 'utils/localization';

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
    it('should localize array of items', () => {
      const localizeItem = (item, lang) => ({ ...item, title: item[lang] });
      const items = [
        { be: 'тарожкі', en: 'bread' },
        { be: 'малако', en: 'milk' },
      ];
      const result = localizeArray(localizeItem)(items, 'en');
      expect(result[0].title).toBe('bread');
      expect(result[1].title).toBe('milk');
    });

    it('should return undefined if items is undefined', () => {
      const localizeItem = item => item;
      expect(localizeArray(localizeItem)(undefined, 'en')).toBeUndefined();
    });

    it('should return undefined if items is null', () => {
      const localizeItem = item => item;
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

  describe('getLocale', () => {
    it('should get locale from query', () => {
      const result = getLocale({ query: { lang: 'ru' }, asPath: '/ru/some-path' });
      expect(result).toBe('ru');
    });

    it('should parse locale from asPath if not in query', () => {
      const result = getLocale({ query: {}, asPath: '/en/some-path' });
      expect(result).toBe('en');
    });

    it('should fallback to default if invalid locale in path', () => {
      const result = getLocale({ query: {}, asPath: '/fr/some-path' });
      expect(result).toBe('be');
    });

    it('should fallback to default for root path', () => {
      const result = getLocale({ query: {}, asPath: '/some-path' });
      expect(result).toBe('be');
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
  });
});
