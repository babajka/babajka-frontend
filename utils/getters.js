import { DEFAULT_LOCALE } from 'constants';

export const getLocalizedBrand = ({ slug, imageUrl, names }, lang = DEFAULT_LOCALE) => ({
  slug,
  imageUrl,
  name: names[lang] || names[DEFAULT_LOCALE],
});

export const getLocalizedBrands = (brands, lang = DEFAULT_LOCALE) =>
  brands && brands.map(brand => getLocalizedBrand(brand, lang));

export const getLocalizedArticle = (article, lang = DEFAULT_LOCALE) =>
  article && (article.locales[lang] || article.locales[DEFAULT_LOCALE]);

export const getLocalizedArticles = (articles, lang = DEFAULT_LOCALE) =>
  articles.map(({ brand, type, locales, author, imageUrl }) => ({
    ...getLocalizedArticle({ locales }, lang),
    author,
    imageUrl,
    brand: getLocalizedBrand(brand, lang),
    type,
  }));
