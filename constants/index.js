const DEFAULT_LOCALE = 'be';

// maybe move labels to i18n dict
// supported locales
const LOCALES = {
  be: 'па-беларуску',
  ru: 'по-русски',
  en: 'in english',
};

const LOCALE_CODE = {
  be: 'be_BY',
  ru: 'ru_RU',
  en: 'en_US',
};

const VALID_LOCALES = Object.keys(LOCALES);

const LANGS = Object.entries(LOCALES).map(([id, label]) => ({ id, label }));

const DOMAIN_SECURE = 'https://wir.by';

const STATIC_PATHS = ['static', '_next'];

// `themes` should be first (check out Footer)
const TOPICS = ['themes', 'locations', 'times', 'personalities', 'authors', 'brands'];

const NY2021 = 'ny2021';

module.exports = {
  DEFAULT_LOCALE,
  DOMAIN_SECURE,
  LANGS,
  LOCALE_CODE,
  LOCALES,
  STATIC_PATHS,
  VALID_LOCALES,
  TOPICS,
  NY2021,
};
