// Ported from legacy `utils/localization.js`.
// `getLocale` is not ported: it reads the Pages Router `router` object. In v3 the locale comes from
// the `[lang]` route param (Phase 2).
import { DEFAULT_LOCALE, type Lang } from '@/constants';

/** A value with one variant per locale, as the backend returns it, e.g. `{ be: '…', ru: '…' }`. */
export type Localized<T = string> = Partial<Record<Lang, T>>;

// here are the rules for localization:
// 1. requested lang
// 2. default (be)
// 3. any existing
export function localize<T>(object: Localized<T>, lang?: Lang): T | undefined;
export function localize<O extends null | undefined>(object: O, lang?: Lang): O;
export function localize<T>(
  object: Localized<T> | null | undefined,
  lang?: Lang
): T | null | undefined;
export function localize<T>(object: Localized<T> | null | undefined, lang: Lang = DEFAULT_LOCALE) {
  return object && (object[lang] || object[DEFAULT_LOCALE] || Object.values(object)[0]);
}

export const localizeArray =
  <I, R>(localizeItem: (item: I, lang: Lang) => R) =>
  (items: I[] | null | undefined, lang: Lang): R[] | undefined =>
    items?.map(item => localizeItem(item, lang));

type Unlocalized<V> = V extends Localized<infer T> ? T | undefined : undefined;

export type LocalizedFields<O, K extends PropertyKey> = Omit<O, K> & {
  [P in K]: P extends keyof O ? Unlocalized<O[P]> : undefined;
};

export const localizeFields =
  <K extends string>(fields: readonly K[]) =>
  <O extends object>(object: O | null | undefined, lang: Lang) => {
    if (!object) {
      return object;
    }
    const localized = { ...object } as Record<string, unknown>;
    const source = object as Record<string, Localized<unknown> | undefined>;
    fields.forEach(key => {
      localized[key] = localize(source[key], lang);
    });
    return localized as LocalizedFields<O, K>;
  };

/**
 * Removes a leading `/${lang}` segment: `/ru/article/x` → `/article/x`.
 * Legacy used `url.replace(`/${lang}`, '')`, which also cut `/en` out of `/article/enigma`.
 */
export const replaceLocale = (url: string, lang: Lang) => {
  const rest = url.replace(new RegExp(`^/${lang}(?=[/?#]|$)`), '');
  return rest.startsWith('/') ? rest : `/${rest}`;
};
