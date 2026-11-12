import { describe, expect, it } from 'vitest';

import { getLocaleRedirect } from '@/lib/locale-redirect';

describe('lib/locale-redirect (legacy server.js rules)', () => {
  describe('/', () => {
    it('should go to the default locale without a cookie', () => {
      expect(getLocaleRedirect('/', '', undefined)).toBe('/be');
    });

    it('should go to the cookie locale and keep the query', () => {
      expect(getLocaleRedirect('/', '?utm=x', 'ru')).toBe('/ru?utm=x');
    });

    it('should ignore an invalid cookie', () => {
      expect(getLocaleRedirect('/', '', 'fr')).toBe('/be');
    });
  });

  describe('paths without a locale', () => {
    it('should add the default or cookie locale', () => {
      expect(getLocaleRedirect('/about', '', undefined)).toBe('/be/about');
      expect(getLocaleRedirect('/article/kupala-kolas', '?x=1', 'en')).toBe(
        '/en/article/kupala-kolas?x=1'
      );
    });

    it('should prefix an unknown locale-like segment, like legacy', () => {
      expect(getLocaleRedirect('/fr/about', '', undefined)).toBe('/be/fr/about');
    });
  });

  describe('paths with a locale', () => {
    it('should continue without a cookie', () => {
      expect(getLocaleRedirect('/ru/about', '', undefined)).toBeNull();
      expect(getLocaleRedirect('/en', '', undefined)).toBeNull();
    });

    it('should continue when the cookie matches', () => {
      expect(getLocaleRedirect('/ru/about', '', 'ru')).toBeNull();
    });

    it('should switch to the cookie locale when it differs', () => {
      expect(getLocaleRedirect('/be/about', '', 'ru')).toBe('/ru/about');
      expect(getLocaleRedirect('/be', '', 'en')).toBe('/en');
      expect(getLocaleRedirect('/be/topic/themes', '?page=2', 'en')).toBe(
        '/en/topic/themes?page=2'
      );
    });
  });

  describe('static paths', () => {
    it.each([
      '/_next/static/chunks/app.js',
      '/_next/image',
      '/api/articles',
      '/auth/login',
      '/test/fixture.json',
      '/revalidate',
      '/static/logo.png',
      '/favicon.ico',
      '/robots.txt',
    ])('should skip %s', path => {
      expect(getLocaleRedirect(path, '', 'ru')).toBeNull();
    });

    it('should not treat a segment that only starts like a static one as static', () => {
      expect(getLocaleRedirect('/apiary', '', undefined)).toBe('/be/apiary');
    });
  });
});
