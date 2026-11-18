// Ported from legacy `constants/index.js`.

export const DEFAULT_LOCALE = 'be';

// supported locales
export const LOCALES = {
  be: 'па-беларуску',
  ru: 'по-русски',
  en: 'in english',
} as const;

export type Lang = keyof typeof LOCALES;

export const LOCALE_CODE: Record<Lang, string> = {
  be: 'be_BY',
  ru: 'ru_RU',
  en: 'en_US',
};

export const VALID_LOCALES = Object.keys(LOCALES) as Lang[];

export const LANGS = VALID_LOCALES.map(id => ({ id, label: LOCALES[id] }));

export const isLang = (value: unknown): value is Lang =>
  typeof value === 'string' && (VALID_LOCALES as string[]).includes(value);

// Cookie with the user's preferred locale, set by the language switch (legacy constants/server.js).
export const LOCALE_COOKIE_NAME = 'WIR_LOCALE';

export const DOMAIN_SECURE = 'https://wir.by';

// `themes` should be first (check out Footer)
export const TOPICS = [
  'themes',
  'locations',
  'times',
  'personalities',
  'authors',
  'brands',
] as const;

export type Topic = (typeof TOPICS)[number];

export const NY2021 = 'ny2021';
