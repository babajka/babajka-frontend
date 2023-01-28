import { DEFAULT_LOCALE, VALID_LOCALES } from 'constants';

// here are the rules for localization:
// 1. requested lang
// 2. default (be)
// 3. any existing
export const localize = (object, lang = DEFAULT_LOCALE) =>
  object && (object[lang] || object[DEFAULT_LOCALE] || Object.values(object)[0]);

export const localizeArray = localizeItem => (items, lang) =>
  items?.map(item => localizeItem(item, lang));

const copy = obj => ({ ...obj });

export const localizeFields = (fields, format = copy) => (object, lang) => {
  if (!object) {
    return object;
  }
  const localized = format(object);
  fields.forEach(key => {
    localized[key] = localize(object[key], lang);
  });
  return localized;
};

export const getLocale = ({ asPath, query: { lang } }) => {
  // query has 'lang' field if it was successfully matched by the router.
  if (lang) {
    return lang;
  }

  // parse locale for invalid paths (404)
  // asPath starts with '/', so we have to take [1], not [0].
  const parsedLang = asPath.split('/')[1];
  if (VALID_LOCALES.includes(parsedLang)) {
    return parsedLang;
  }

  return DEFAULT_LOCALE;
};

export const replaceLocale = (url, lang) => url.replace(`/${lang}`, '');
