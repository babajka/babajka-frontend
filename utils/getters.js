import keyBy from 'lodash/keyBy';

import parseISO from 'date-fns/parseISO';
import isBefore from 'date-fns/isBefore';

import { TOPICS } from 'constants';
import { localize, localizeArray, localizeFields } from 'utils/localization';

const getTopic = ({ _id: id, slug }) => ({ id, slug });
const GETTER_BY_TYPE = {
  topics: topics => topics?.map(getTopic),
};

const SKIP_MAP_BY_ID = ['latestArticles'];
export const localizeData = (data, lang) =>
  Object.entries(data).reduce((acc, [type, list]) => {
    const localizedList = GETTER_BY_TYPE[type](list, lang);
    acc[type] = SKIP_MAP_BY_ID.includes(type) ? localizedList : keyBy(localizedList, 'id');
    return acc;
  }, {});

/*
 *               TAGS
 */

const getInitTagsByTopic = () => TOPICS.reduce((acc, topic) => ({ ...acc, [topic]: [] }), {});

const LOCALIZE_TAG_CONTENT = {
  themes: localizeFields(['title']),
  locations: localizeFields(['title']),
  times: localizeFields(['title']),
  personalities: localizeFields(['name', 'subtitle', 'description']),
  brands: localizeFields(['title']),
  authors: localizeFields(['firstName', 'lastName', 'bio']),
};

// WARNING: filter `topic`
// TODO: remove `topic` on back, replace with `topicSlug`
export const getLocalizedTag = ({ _id: id, topicSlug, content, topic: _, ...rest }, lang) => ({
  ...rest,
  id,
  topicSlug,
  content: LOCALIZE_TAG_CONTENT[topicSlug](content, lang),
});

const getLocalizedTags = localizeArray(getLocalizedTag);

/*
 *               ARTICLE
 */

export const getLocalesBySlug = ({ locales }) =>
  Object.entries(locales).reduce((acc, [key, { slug }]) => {
    acc[slug] = key;
    return acc;
  }, {});

export const getLocalizedArticle = (article, lang) => {
  if (!article) {
    return null;
  }
  const {
    _id: id,
    locales,
    collection = null,
    publishAt,
    tags = null,
    suggestedArticles = null,
    ...rest
  } = article;
  const { text, metrics: _, ...localized } = localize(locales, lang);

  // TODO: think about implementing this logic at backend
  // WARNING: there are no tags in `prev` & `next` articles in collection
  const tagsByTopic =
    tags &&
    getLocalizedTags(tags, lang).reduce((acc, tag) => {
      acc[tag.topicSlug].push(tag);
      return acc;
    }, getInitTagsByTopic());

  // TODO: move to admin / backend
  // // Accumulating metrics for all content and interface localizations.
  // const totalMetrics = Object.values(locales).reduce(
  //   (acc, locale) =>
  //     acc +
  //     (locale.metrics
  //       ? Object.values(locale.metrics).reduce((acc2, counter) => acc2 + parseInt(counter, 10), 0)
  //       : 0),
  //   0
  // );

  return {
    ...rest,
    ...localized,
    text: text || {},
    id,
    publishAt,
    // eslint-disable-next-line no-use-before-define
    collection: collection && getLocalizedCollection(collection, lang),
    published: !!publishAt && isBefore(parseISO(publishAt), new Date()),
    tagsByTopic,
    // metrics: totalMetrics,
    suggestedArticles: suggestedArticles && {
      blocks: suggestedArticles.blocks,
      data: localizeData(suggestedArticles.data, lang),
    },
  };
};

export const getLocalizedArticles = localizeArray(getLocalizedArticle);

/*
 *               COLLECTION
 */

export const getLocalizedCollection = (
  { slug, cover, name, description, articles, articleIndex = 0 },
  lang
) => ({
  slug,
  cover,
  articleIndex,
  name: localize(name, lang),
  description: localize(description, lang),
  articles: articles?.map(a => getLocalizedArticle(a, lang)) || null,
});

/*
 *               GETTER_BY_TYPE
 */

GETTER_BY_TYPE.tags = getLocalizedTags;
GETTER_BY_TYPE.articles = getLocalizedArticles;
GETTER_BY_TYPE.latestArticles = getLocalizedArticles;
