import {
  DEFAULT_LOCALE,
  DOMAIN_SECURE,
  LANGS,
  LOCALE_CODE,
  LOCALES,
  STATIC_PATHS,
  VALID_LOCALES,
  TOPICS,
  NY2021,
} from 'constants';

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

  describe('STATIC_PATHS', () => {
    it('should contain static and next paths', () => {
      expect(STATIC_PATHS).toContain('static');
      expect(STATIC_PATHS).toContain('_next');
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
