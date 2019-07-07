import createReducer from 'type-to-reducer';

import api from 'constants/api';
import { defaultReducer } from 'utils/redux';
import { makeRequest } from 'utils/request';
import { getLocalizedTag, getLocalizedArticles } from 'utils/getters';

const duck = 'tags';

// constants
const FETCH_ARTICLES = `${duck}/FETCH_ARTICLES`;

// reducer
const initialState = {
  pending: false,
  error: false,
  tag: null,
  articles: [],
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
const getState = state => state.tags;
const getData = (state, lang) => {
  const { tag, articles } = getState(state);

  return {
    articles: getLocalizedArticles(articles, lang),
    tag: getLocalizedTag(tag),
  };
};

// selectors
export const tagsSelectors = {
  getData,
};

// actions
export const tagsActions = {
  fetchArticles: tag => ({
    type: FETCH_ARTICLES,
    payload: makeRequest(api.tags.getArticles(tag)),
  }),
};
