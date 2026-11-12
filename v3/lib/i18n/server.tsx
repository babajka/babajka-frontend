// Server-side i18n. Locale comes from the `[lang]` root segment via `next/root-params`, so
// Server Components don't need a `lang` prop or a context (legacy `LocaleContext`).
import { lang as rootLang } from 'next/root-params';
import type { ReactNode } from 'react';

import { DEFAULT_LOCALE, isLang, type Lang } from '@/constants';

import { createT, splitParts, translate, type DictKey } from './dict';

/** Locale from the `[lang]` root segment, or `null` if it isn't a valid locale. */
export const getRootLang = async (): Promise<Lang | null> => {
  const value = await rootLang();
  return isLang(value) ? value : null;
};

/** Current locale from the URL. Falls back to `be` outside the `[lang]` segment. */
export const getLang = async (): Promise<Lang> => (await getRootLang()) ?? DEFAULT_LOCALE;

/** `const t = await getT(); t('footer.rss')`. Pass `lang` to skip reading the route. */
export const getT = async (lang?: Lang) => createT(lang ?? (await getLang()));

type TextProps = {
  id: DictKey;
  /** Gets the `||`-separated parts as arguments. Default: the first part, like legacy. */
  render?: (...parts: string[]) => ReactNode;
};

/** Server version of legacy `<Text id="…" />` / `<Text id="…">{(a, b) => …}</Text>`. */
export const Text = async ({ id, render = first => first }: TextProps) => {
  const lang = await getLang();
  return <>{render(...splitParts(translate(id, lang)))}</>;
};
