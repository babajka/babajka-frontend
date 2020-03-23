import { DEFAULT_LOCALE } from 'constants';

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
