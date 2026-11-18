import { afterEach, describe, expect, it, vi } from 'vitest';

import dict from '@/data/i18n.json';
import {
  createT,
  CLIENT_SCOPES,
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

  it('should resolve only the client scopes for the client', () => {
    const messages = getMessages('ru');
    const scopes = new Set(Object.keys(messages).map(key => key.split('.')[0]));

    expect(messages['footer.rss']).toBe(dict.footer.rss.ru);
    expect([...scopes].sort()).toEqual([...CLIENT_SCOPES].sort());
    expect(messages).not.toHaveProperty('topic.themes');
    expect(Object.keys(messages)).toHaveLength(
      CLIENT_SCOPES.reduce((sum, scope) => sum + Object.keys(dict[scope]).length, 0)
    );
  });

  it('should keep the client messages small (they ship with every page)', () => {
    for (const lang of ['be', 'ru', 'en'] as const) {
      expect(JSON.stringify(getMessages(lang)).length).toBeLessThan(4_000);
    }
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
