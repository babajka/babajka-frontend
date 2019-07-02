import createReducer from 'type-to-reducer';
import keyBy from 'lodash/keyBy';

import api from 'constants/api';
import { defaultReducer } from 'utils/redux';
import { makeRequest } from 'utils/request';
import { getLocalizedTag, getLocalizedArticles } from 'utils/getters';

const duck = 'topics';

// constants
const FETCH_ARTICLES = `${duck}/FETCH_ARTICLES`;

// reducer
const initialState = {
  pending: false,
  error: false,
  tags: [],
  topic: null,
  articles: [],
  articlesByTag: {},
};

export default createReducer(
  {
    [FETCH_ARTICLES]: defaultReducer((state, { payload }) => ({
      ...state,
      ...payload,
    })),
  },
  initialState
);

// selectors
const getState = state => state.topics;
const getData = (state, lang) => {
  const { tags, topic, articles, articlesByTag } = getState(state);

  return {
    articleById: keyBy(getLocalizedArticles(articles, lang), 'id'),
    tags: tags.map(tag => getLocalizedTag({ ...tag, topic }, lang)),
    articlesByTag,
  };
};

// selectors
export const topicsSelectors = {
  getData,
};

// actions
export const topicsActions = {
  fetchArticles: topic => ({
    type: FETCH_ARTICLES,
    payload: makeRequest(api.topics.getArticles(topic)),
  }),
};
