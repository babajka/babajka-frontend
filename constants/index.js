const DEFAULT_LOCALE = 'be';

// supported locales
const LOCALES = {
  be: 'беларуская',
  ru: 'русский',
  en: 'english',
};

const LANGS = Object.entries(LOCALES).map(([id, label]) => ({ id, label }));

module.exports = { LOCALES, DEFAULT_LOCALE, LANGS };
