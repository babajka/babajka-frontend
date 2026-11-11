import { describe, expect, it } from 'vitest';

import {
  DEFAULT_LOCALE,
  DOMAIN_SECURE,
  isLang,
  LANGS,
  LOCALE_CODE,
  LOCALES,
  NY2021,
  TOPICS,
  VALID_LOCALES,
} from '@/constants';

// Ported from legacy `constants/index.test.js`. `STATIC_PATHS` is not ported: it only exists for the
// Express locale redirect, which becomes `proxy.ts` in Phase 2.
describe('constants', () => {
  describe('DEFAULT_LOCALE', () => {
    it('should be set to Belarusian', () => {
      expect(DEFAULT_LOCALE).toBe('be');
    });
  });

  describe('LOCALES', () => {
    it('should have Belarusian locale', () => {
      expect(LOCALES.be).toBe('па-беларуску');
    });

    it('should have Russian locale', () => {
      expect(LOCALES.ru).toBe('по-русски');
    });

    it('should have English locale', () => {
      expect(LOCALES.en).toBe('in english');
    });
  });

  describe('LOCALE_CODE', () => {
    it('should have correct locale codes', () => {
      expect(LOCALE_CODE.be).toBe('be_BY');
      expect(LOCALE_CODE.ru).toBe('ru_RU');
      expect(LOCALE_CODE.en).toBe('en_US');
    });
  });

  describe('VALID_LOCALES', () => {
    it('should contain all valid locale keys', () => {
      expect(VALID_LOCALES).toEqual(['be', 'ru', 'en']);
    });
  });

  describe('isLang', () => {
    it('should accept valid locales only', () => {
      expect(isLang('be')).toBe(true);
      expect(isLang('en')).toBe(true);
      expect(isLang('fr')).toBe(false);
      expect(isLang(undefined)).toBe(false);
    });
  });

  describe('LANGS', () => {
    it('should have correct lang entries', () => {
      expect(LANGS).toHaveLength(3);
      expect(LANGS).toContainEqual({ id: 'be', label: 'па-беларуску' });
      expect(LANGS).toContainEqual({ id: 'ru', label: 'по-русски' });
      expect(LANGS).toContainEqual({ id: 'en', label: 'in english' });
    });
  });

  describe('DOMAIN_SECURE', () => {
    it('should be production domain', () => {
      expect(DOMAIN_SECURE).toBe('https://wir.by');
    });
  });

  describe('TOPICS', () => {
    it('should have all topics', () => {
      expect(TOPICS).toEqual([
        'themes',
        'locations',
        'times',
        'personalities',
        'authors',
        'brands',
      ]);
    });

    it('should have themes as first topic', () => {
      expect(TOPICS[0]).toBe('themes');
    });
  });

  describe('NY2021', () => {
    it('should be ny2021 string', () => {
      expect(NY2021).toBe('ny2021');
    });
  });
});
