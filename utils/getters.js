import fromPairs from 'lodash/fromPairs';
import chunk from 'lodash/chunk';
import { DEFAULT_LOCALE } from 'constants';

// here is rules for localization:
// 1. requested lang
// 2. default (be)
// 3. any existing
const localize = (object, lang = DEFAULT_LOCALE) =>
  object && (object[lang] || object[DEFAULT_LOCALE] || Object.values(object)[0]);

export const getLocalizedAuthor = (author, lang) => {
  if (!author) {
    return null;
  }
  const localized = { ...author };
  ['firstName', 'lastName', 'displayName', 'bio'].forEach(key => {
    localized[key] = localize(author[key], lang);
  });
  return localized;
};

export const getLocalizedBrand = ({ slug, imageUrl, names }, lang) => ({
  slug,
  imageUrl,
  name: localize(names, lang),
});

export const getLocalizedCollection = ({ name }, lang) => ({
  name: localize(name, lang),
});

export const getLocalizedBrands = (brands, lang) =>
  brands && brands.map(brand => getLocalizedBrand(brand, lang));

export const getLocalesBySlug = ({ locales }) =>
  fromPairs(Object.entries(locales).map(([key, { slug }]) => [slug, key]));

export const getLocalizedArticle = (article, lang) => {
  if (!article) {
    return null;
  }
  const { brand, type, locales, author, imageUrl, collectionId, publishAt } = article;
  return {
    ...localize(locales, lang),
    author: getLocalizedAuthor(author, lang),
    brand: getLocalizedBrand(brand, lang),
    imageUrl,
    type,
    // TODO(andemerie): add 'collection' field to all 'article' objects on server, even if this
    // article doesn't belong to any collection; remove the following check, when it is implemented
    collection: collectionId ? getLocalizedCollection(collectionId, lang) : null,
    publishAt,
  };
};

export const getLocalizedArticles = (articles, lang) =>
  articles.map(article => getLocalizedArticle(article, lang));

export const getShortLocale = ({ locale, slug, title }) => ({ locale, slug, title });

export const getArticlesRows = (articles, rowSize) => chunk(articles, rowSize);

export const getLocalizedTeam = (team, lang) =>
  team &&
  team.map(({ name, role, ...rest }, index) => ({
    ...rest,
    id: index,
    name: localize(name, lang),
    role: localize(role, lang),
  }));

export const getLocalizedVacancies = (vacancies, lang) =>
  vacancies &&
  vacancies.map(({ title, description }, index) => ({
    id: index,
    title: localize(title, lang),
    description: localize(description, lang),
  }));
