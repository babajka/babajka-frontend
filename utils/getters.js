import moment from 'moment';
import chunk from 'lodash/chunk';

import { TOPICS } from 'constants';
import { localize, localizeArray, localizeFields } from 'utils/localization';

export const getDiary = ({ author, text, day, month, year, slug }) => ({
  author,
  text,
  slug,
  // TODO(tyndria): extract it in some func & simplify
  date: ((month && moment({ day, month: month - 1, year })) || moment()).valueOf(),
  day,
  month,
});

export const getLocalizedCollection = (
  { slug, cover, name, description, articles, articleIndex },
  lang
) => ({
  slug,
  cover,
  articleIndex,
  name: localize(name, lang),
  description: localize(description, lang),
  articles: articles.map(getLocalizedArticle), // eslint-disable-line no-use-before-define
});

export const getLocalizedCollections = localizeArray(getLocalizedCollection);

export const getLocalesBySlug = ({ locales }) =>
  Object.entries(locales).reduce((acc, [key, { slug }]) => {
    acc[slug] = key;
    return acc;
  }, {});

const LOCALIZE_TAG_CONTENT = {
  themes: localizeFields(['title']),
  locations: localizeFields(['title']),
  times: localizeFields(['title']),
  personalities: localizeFields(['name', 'subtitle', 'description']),
  brands: localizeFields(['title']),
  authors: localizeFields(['firstName', 'lastName', 'bio']),
};

export const getTopic = ({ _id: id, slug }) => ({ id, slug });

export const getTopics = topics => topics.map(getTopic);

// WARNING: filter `topic`
// TODO: remove `topic` on back, replace with `topicSlug`
export const getLocalizedTag = ({ _id: id, topicSlug, content, topic: _, ...rest }, lang) => ({
  ...rest,
  id,
  topicSlug,
  content: LOCALIZE_TAG_CONTENT[topicSlug](content, lang),
});

export const getLocalizedTags = localizeArray(getLocalizedTag);

const getInitTagsByTopic = () => TOPICS.reduce((acc, topic) => ({ ...acc, [topic]: [] }), {});

export const getLocalizedArticle = (article, lang) => {
  if (!article) {
    return null;
  }
  const { _id: id, locales, collection, publishAt, tags, ...rest } = article;
  const { text, ...localized } = localize(locales, lang);

  // TODO: think about implementing this logic at backend
  // WARNING: there are no tags in `prev` & `next` articles in collection
  const tagsByTopic =
    tags &&
    getLocalizedTags(tags, lang).reduce((acc, tag) => {
      acc[tag.topicSlug].push(tag);
      return acc;
    }, getInitTagsByTopic());

  return {
    ...rest,
    ...localized,
    text: text || {},
    id,
    publishAt,
    collection: collection && getLocalizedCollection(collection, lang),
    published: !!publishAt && moment(publishAt).isBefore(moment()),
    tagsByTopic,
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

// returns a list of articles coupled by 2 or 3
// 5 articles = 2 blocks (2 + 3)
export const getArticlesBlocks = articles =>
  chunk(articles, 5).reduce(
    (blocks, blockOf5) =>
      blocks.concat([blockOf5.slice(0, 2), blockOf5.slice(2)]).filter(b => b.length),
    []
  );
