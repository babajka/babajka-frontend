import restProvider from 'ra-data-simple-rest';
import identity from 'lodash/identity';

import { getLocalizedArticles } from 'utils/getters';

import { API_URL } from 'constants/api';

const baseProvider = restProvider(API_URL);

const formatterByResourse = {
  articles: getLocalizedArticles,
};

const dataProvider = {
  ...baseProvider,
  getList: (resource, params) => {
    return baseProvider.getList(resource, params).then(({ data, total }) => {
      const format = formatterByResourse[resource] || identity;
      return { data: format(data), total };
    });
  },
};

export default dataProvider;
