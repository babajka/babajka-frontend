import moment from 'moment';
import fromPairs from 'lodash/fromPairs';
import chunk from 'lodash/chunk';

import { TAG_BLOCK_SIZE, TAG_LEVELS_SIZES } from 'constants/misc';
import { localize, localizeArray, localizeFields } from 'utils/localization';

export const getDiary = ({ author = '', text = '', day, month, year } = {}) => ({
  author,
  text,
  // TODO(tyndria): extract it in some func & simplify
  date: ((month && moment({ day, month: month - 1, year })) || moment()).valueOf(),
});

export const getLocalizedCollection = (
  { slug, imageUrl, name, description, prev, next, articleIndex },
  lang
) => ({
  slug,
  imageUrl,
  name: localize(name, lang),
  description: localize(description, lang),
  prev: getLocalizedArticle(prev), // eslint-disable-line no-use-before-define
  next: getLocalizedArticle(next), // eslint-disable-line no-use-before-define
  articleIndex, // TODO: sync with back
});

export const getLocalizedCollections = localizeArray(getLocalizedCollection);

export const getLocalesBySlug = ({ locales }) =>
  fromPairs(Object.entries(locales).map(([key, { slug }]) => [slug, key]));

const LOCALIZE_TAG_CONTENT = {
  themes: localizeFields(['title']),
  locations: localizeFields(['title']),
  times: localizeFields(['title']),
  personalities: localizeFields(['name', 'dates', 'description']),
  brands: localizeFields(['title']),
  authors: localizeFields(['firstName', 'lastName', 'bio']),
};

export const getTopic = ({ _id: id, slug }) => ({ id, slug });

export const getTopics = topics => topics.map(getTopic);

export const getLocalizedTag = ({ _id: id, topic, content, ...rest }, lang) => ({
  ...rest,
  id,
  topic: getTopic(topic),
  content: LOCALIZE_TAG_CONTENT[topic.slug](content, lang),
});

export const getLocalizedTags = localizeArray(getLocalizedTag);

export const getLocalizedArticle = (article, lang) => {
  if (!article) {
    return null;
  }
  const {
    _id: id,
    locales,
    collection,
    publishAt,
    tags,
    images: covers,
    color,
    textColorTheme: theme,
    ...rest
  } = article;
  const { subtitle: description, ...localizedRest } = localize(locales, lang);
  return {
    ...rest,
    ...localizedRest,
    id,
    publishAt,
    description,
    covers,
    theme,
    // FIXME
    bgColor: `#${color}`,
    collection: collection && getLocalizedCollection(collection, lang),
    published: !!publishAt && moment(publishAt).isBefore(moment()),
    tags: getLocalizedTags(tags, lang),
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

export const getTagBlockLevels = articles =>
  TAG_LEVELS_SIZES.reduce(
    ({ start, result }, levelSize) => {
      const end = start + levelSize;
      result.push(articles.slice(start, end));
      return { result, start: end };
    },
    { start: 0, result: [] }
  ).result;

export const getTagBlocks = articles => chunk(articles, TAG_BLOCK_SIZE).map(getTagBlockLevels);
