// UI dictionary: lookup with the fallbacks of legacy `components/common/Text.js`.
// data/i18n.json comes from the Google Sheet (`npm run fetch-dict`).
//
// Server-only: the whole dictionary (all locales) stays on the server. Client islands get only the
// `CLIENT_SCOPES` of one locale, through `getMessages()` → `I18nProvider`. Importing this module
// from a Client Component fails the build.
import 'server-only';

import dict from '@/data/i18n.json';
import { DEFAULT_LOCALE, type Lang } from '@/constants';

import { CLIENT_SCOPES, type ClientKey, type ClientMessages, type DictKey } from './shared';

export { CLIENT_SCOPES, SEPARATOR, splitParts } from './shared';
export type { ClientKey, ClientMessages, DictKey } from './shared';

type Scope = keyof typeof dict;

const lookup = (id: string, lang: Lang): string => {
  const dot = id.indexOf('.');
  const scope = (dict as Record<string, Record<string, Partial<Record<Lang, string>>>>)[
    id.slice(0, dot)
  ];
  return scope?.[id.slice(dot + 1)]?.[lang] ?? '';
};

export const isDictKey = (id: string): id is DictKey =>
  id.includes('.') && lookup(id, DEFAULT_LOCALE) !== '';

/**
 * Same rules as legacy `localize(id, lang)` in components/common/Text.js:
 * 1. requested lang, 2. default (be), 3. the key itself.
 */
const resolve = (id: DictKey, lang: Lang) => lookup(id, lang) || lookup(id, DEFAULT_LOCALE);

export const translate = (id: DictKey, lang: Lang): string => {
  const text = resolve(id, lang);
  if (!text && process.env.NODE_ENV !== 'production') {
    console.warn('[i18n]: No translation for', id);
  }
  return text || id;
};

const CLIENT_KEYS = CLIENT_SCOPES.flatMap(scope =>
  Object.keys(dict[scope as Scope]).map(key => `${scope}.${key}` as ClientKey)
);

/**
 * The `CLIENT_SCOPES` keys resolved for `lang` (with fallbacks), for `I18nProvider`: ~35 short
 * strings, about 1 KB gzipped. No warnings here: keys empty in the Sheet only warn when a component
 * actually uses them.
 */
const MESSAGES = new Map<Lang, ClientMessages>();

export const getMessages = (lang: Lang): ClientMessages => {
  let messages = MESSAGES.get(lang);
  if (!messages) {
    messages = Object.fromEntries(
      CLIENT_KEYS.map(id => [id, resolve(id, lang) || id])
    ) as ClientMessages;
    MESSAGES.set(lang, messages);
  }
  return messages;
};

export type Translate = (id: DictKey) => string;

export const createT =
  (lang: Lang): Translate =>
  id =>
    translate(id, lang);
