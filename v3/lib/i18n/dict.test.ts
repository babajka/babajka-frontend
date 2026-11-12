import { afterEach, describe, expect, it, vi } from 'vitest';

import dict from '@/data/i18n.json';
import {
  createT,
  getMessages,
  isDictKey,
  splitParts,
  translate,
  type DictKey,
} from '@/lib/i18n/dict';

describe('lib/i18n/dict', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should translate to the requested locale', () => {
    expect(translate('footer.rss', 'be')).toBe(dict.footer.rss.be);
    expect(translate('footer.rss', 'en')).toBe(dict.footer.rss.en);
  });

  it('should fall back to be, then to the key, like legacy <Text>', () => {
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    const missing = 'footer.no-such-key' as DictKey;

    expect(translate(missing, 'en')).toBe('footer.no-such-key');
    expect(console.warn).toHaveBeenCalledWith('[i18n]: No translation for', missing);
  });

  it('should split multi-part translations on ||', () => {
    expect(splitParts('a||b||c')).toEqual(['a', 'b', 'c']);
    expect(splitParts(translate('common.motto', 'be')).length).toBeGreaterThan(1);
  });

  it('should not warn about unused empty keys when resolving all messages', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    getMessages('en');
    expect(warn).not.toHaveBeenCalled();
  });

  it('should resolve every key for the client', () => {
    const messages = getMessages('ru');
    expect(messages['footer.rss']).toBe(dict.footer.rss.ru);
    expect(Object.keys(messages).length).toBeGreaterThan(100);
  });

  it('should create a bound t()', () => {
    expect(createT('en')('footer.rss')).toBe(dict.footer.rss.en);
  });

  it('should check keys at runtime', () => {
    expect(isDictKey('footer.rss')).toBe(true);
    expect(isDictKey('footer.nope')).toBe(false);
    expect(isDictKey('nope')).toBe(false);
  });
});
