import fromPairs from 'lodash/fromPairs';
import chunk from 'lodash/chunk';
import moment from 'moment';

import { localize, localizeArray, localizeFields } from 'utils/localization';

export const getDiary = ({ author = '', text = '', day, month, year } = {}) => ({
  author,
  text,
  // TODO(tyndria): extract it in some func & simplify
  date: ((month && moment({ day, month: month - 1, year })) || moment()).valueOf(),
});

export const getLocalizedAuthor = localizeFields(['firstName', 'lastName', 'displayName', 'bio']);

export const getLocalizedAuthors = localizeArray(getLocalizedAuthor);

export const getLocalizedBrand = ({ slug, imageUrl, names, _id: id }, lang) => ({
  id,
  slug,
  imageUrl,
  name: localize(names, lang),
});

export const getLocalizedBrands = localizeArray(getLocalizedBrand);

export const getLocalizedCollection = (
  { slug, imageUrl, name, description, prev, next },
  lang
) => ({
  slug,
  imageUrl,
  name: localize(name, lang),
  description: localize(description, lang),
  prev: getLocalizedArticle(prev), // eslint-disable-line no-use-before-define
  next: getLocalizedArticle(next), // eslint-disable-line no-use-before-define
});

export const getLocalizedCollections = localizeArray(getLocalizedCollection);

export const getLocalesBySlug = ({ locales }) =>
  fromPairs(Object.entries(locales).map(([key, { slug }]) => [slug, key]));

export const getLocalizedArticle = (article, lang) => {
  if (!article) {
    return null;
  }
  const { _id: id, brand, locales, author, collection, publishAt, ...rest } = article;
  return {
    ...localize(locales, lang),
    ...rest,
    id,
    author: author && getLocalizedAuthor(author, lang),
    brand: brand && getLocalizedBrand(brand, lang),
    collection: collection && getLocalizedCollection(collection, lang),
    publishAt,
    published: !!publishAt && moment(publishAt).isBefore(moment()),
  };
};

export const getLocalizedArticles = localizeArray(getLocalizedArticle);

export const getShortLocale = ({ locale, slug, title }) => ({ locale, slug, title });

export const getArticlesRows = (articles, rowSize) => chunk(articles, rowSize);

export const getMainArticlesRows = (articles, rowSize, complexRowSize) => {
  const firstRow = articles.slice(0, rowSize);
  const secondRowEnd = rowSize + complexRowSize;
  const secondRow = articles.slice(rowSize, secondRowEnd);
  return [firstRow, secondRow, ...getArticlesRows(articles.slice(secondRowEnd), rowSize)];
};

export const getLocalizedTeam = localizeArray(localizeFields(['name', 'role']));

export const getLocalizedVacancies = localizeArray(localizeFields(['title', 'description']));

const LOCALIZE_TAG_CONTENT = {
  themes: localizeFields(['title']),
  locations: localizeFields(['title']),
  times: localizeFields(['title']),
  personalities: localizeFields(['name', 'dates', 'description']),
};

export const getTopic = ({ _id: id, slug }) => ({ id, slug });

export const getTopics = topics => topics.map(getTopic);

export const getLocalizedTag = ({ _id: id, topic, content }, lang) => ({
  id,
  topic: getTopic(topic),
  content: LOCALIZE_TAG_CONTENT[topic.slug](content, lang),
});

export const getLocalizedTags = localizeArray(getLocalizedTag);
