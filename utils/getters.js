import { DEFAULT_LOCALE } from 'constants';

// here is rules for localization:
// 1. requested lang
// 2. default (be)
// 3. any existing
const localize = (object, lang = DEFAULT_LOCALE) =>
  object && (object[lang] || object[DEFAULT_LOCALE] || Object.values(object)[0]);

export const getLocalizedAuthor = (author, lang) => {
  const localized = { ...author };
  ['firstName', 'lastName', 'displayName'].forEach(key => {
    localized[key] = localize(author[key], lang);
  });
  return localized;
};

export const getLocalizedBrand = ({ slug, imageUrl, names }, lang) => ({
  slug,
  imageUrl,
  name: localize(names, lang),
});

export const getLocalizedBrands = (brands, lang) =>
  brands && brands.map(brand => getLocalizedBrand(brand, lang));

export const getLocalizedArticle = (article, lang) => article && localize(article.locales, lang);

export const getLocalizedArticles = (articles, lang) =>
  articles.map(({ brand, type, locales, author, imageUrl }) => ({
    ...getLocalizedArticle({ locales }, lang),
    author: getLocalizedAuthor(author, lang),
    brand: getLocalizedBrand(brand, lang),
    imageUrl,
    type,
  }));
