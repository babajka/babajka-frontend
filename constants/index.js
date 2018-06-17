const DEFAULT_LOCALE = 'be';

// supported locales
const LOCALES = {
  be: 'Беларуская',
  ru: 'Русский',
  en: 'English',
};

const LANGS = Object.entries(LOCALES).map(([id, label]) => ({ id, label }));

const DATE_FORMAT = 'D MMMM YYYY';

const DOMAIN_SECURE = 'https://wir.by';

module.exports = { LOCALES, DEFAULT_LOCALE, LANGS, DATE_FORMAT, DOMAIN_SECURE };
