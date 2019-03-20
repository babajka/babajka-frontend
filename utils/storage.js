import fromPairs from 'lodash/fromPairs';
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
  fromPairs(
    Object.entries(data).map(([type, list]) => {
      const localizedList = GETTER_BY_TYPE[type](list, lang);
      if (SKIP_MAP_BY_ID.includes(type)) {
        return [type, localizedList];
      }
      return [type, keyBy(localizedList, 'id')];
    })
  );

export const a = 1;
