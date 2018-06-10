import fromPairs from 'lodash/fromPairs';
import chunk from 'lodash/chunk';
import moment from 'moment';
import { DEFAULT_LOCALE } from 'constants';

// here are the rules for localization:
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

export const getLocalizedCollection = (
  { slug, imageUrl, name, description, prev, next },
  lang
) => ({
  slug,
  imageUrl,
  name: localize(name, lang),
  description: localize(description, lang),
  prev: prev && getLocalizedArticle(prev), // eslint-disable-line no-use-before-define
  next: next && getLocalizedArticle(next), // eslint-disable-line no-use-before-define
});

export const getLocalizedBrands = (brands, lang) =>
  brands && brands.map(brand => getLocalizedBrand(brand, lang));

export const getLocalesBySlug = ({ locales }) =>
  fromPairs(Object.entries(locales).map(([key, { slug }]) => [slug, key]));

export const getLocalizedArticle = (article, lang) => {
  if (!article) {
    return null;
  }
  const { brand, type, locales, author, imageUrl, collection, publishAt } = article;
  return {
    ...localize(locales, lang),
    author: author && getLocalizedAuthor(author, lang),
    brand: brand && getLocalizedBrand(brand, lang),
    collection: collection && getLocalizedCollection(collection, lang),
    imageUrl,
    type,
    publishAt,
  };
};

export const getLocalizedArticles = (articles, lang) =>
  articles.map(article => getLocalizedArticle(article, lang));

export const getShortLocale = ({ locale, slug, title }) => ({ locale, slug, title });

export const getArticlesRows = (articles, rowSize) => chunk(articles, rowSize);

export const getMainArticlesRows = (articles, rowSize, complexRowSize) => {
  const firstRow = articles.slice(0, rowSize);
  const secondRowEnd = rowSize + complexRowSize;
  const secondRow = articles.slice(rowSize, secondRowEnd);
  return [firstRow, secondRow, ...getArticlesRows(articles.slice(secondRowEnd), rowSize)];
};

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

export const getDiary = ({ author = '', text = '', day, month, year } = {}) => ({
  author,
  text,
  // TODO(tyndria): extract it in some func & simplify
  date: ((month && moment({ day, month: month - 1, year })) || moment()).valueOf(),
});
