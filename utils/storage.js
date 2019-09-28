import keyBy from 'lodash/keyBy';

import { getLocalizedArticles, getLocalizedTags, getTopics } from 'utils/getters';

const GETTER_BY_TYPE = {
  articles: getLocalizedArticles,
  tags: getLocalizedTags,
  topics: getTopics,
  latestArticles: getLocalizedArticles,
};

const SKIP_MAP_BY_ID = ['latestArticles'];

export const localizeData = (data, lang) =>
  Object.entries(data).reduce((acc, [type, list]) => {
    const localizedList = GETTER_BY_TYPE[type](list, lang);
    acc[type] = SKIP_MAP_BY_ID.includes(type) ? localizedList : keyBy(localizedList, 'id');
    return acc;
  }, {});
