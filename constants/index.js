const DEFAULT_LOCALE = 'be';

// supported locales
const LOCALES = {
  be: 'Беларуская',
  ru: 'Русский',
  en: 'English',
};

const LOCALE_CODE = {
  be: 'be_BY',
  ru: 'ru_RU',
  en: 'en_US',
};

const VALID_LOCALES = Object.keys(LOCALES);

const LANGS = Object.entries(LOCALES).map(([id, label]) => ({ id, label }));

const DATE_FORMAT = 'D MMMM YYYY';

const DOMAIN_SECURE = 'https://wir.by';

const STATIC_PATHS = ['static', '_next'];

module.exports = {
  DATE_FORMAT,
  DEFAULT_LOCALE,
  DOMAIN_SECURE,
  LANGS,
  LOCALE_CODE,
  LOCALES,
  STATIC_PATHS,
  VALID_LOCALES,
};
