// UI dictionary: typed keys, lookup and the `||` split of legacy `components/common/Text.js`.
// data/i18n.json comes from the Google Sheet (`npm run fetch-dict`).
import dict from '@/data/i18n.json';
import { DEFAULT_LOCALE, type Lang } from '@/constants';

type Dict = typeof dict;
type Scope = keyof Dict;

/** `'<scope>.<key>'`, e.g. `'footer.rss'`. Only keys present in data/i18n.json type-check. */
export type DictKey = { [S in Scope]: `${S}.${keyof Dict[S] & string}` }[Scope];

/** All translations for one locale, as passed to client islands. */
export type Messages = Record<DictKey, string>;

/** Separator for multi-part translations, e.g. a text with a link in the middle. */
export const SEPARATOR = '||';

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

/** Legacy `<Text render>` gets the parts of a `||`-separated translation as arguments. */
export const splitParts = (text: string) => text.split(SEPARATOR);

const ALL_KEYS = (Object.entries(dict) as [Scope, Record<string, unknown>][]).flatMap(
  ([scope, entries]) => Object.keys(entries).map(key => `${scope}.${key}` as DictKey)
);

/**
 * Every key resolved for `lang` (with fallbacks), for the client provider. ~140 short strings.
 * No warnings here: keys empty in the Sheet only warn when a component actually uses them.
 */
const MESSAGES = new Map<Lang, Messages>();

export const getMessages = (lang: Lang): Messages => {
  let messages = MESSAGES.get(lang);
  if (!messages) {
    messages = Object.fromEntries(ALL_KEYS.map(id => [id, resolve(id, lang) || id])) as Messages;
    MESSAGES.set(lang, messages);
  }
  return messages;
};

export type Translate = (id: DictKey) => string;

export const createT =
  (lang: Lang): Translate =>
  id =>
    translate(id, lang);
