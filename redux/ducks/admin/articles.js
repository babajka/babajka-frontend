import createReducer from 'type-to-reducer';

import api from 'constants/api';
import { defaultReducer } from 'utils/redux';
import { makeRequest } from 'utils/request';
import { getLocalizedArticles, getLocalizedArticle } from 'utils/getters';

const duck = 'admin/articles';

// constants
const FETCH_ALL = `${duck}/FETCH_ALL`;
const FIBERY_PREVIEW = `${duck}/FIBERY_PREVIEW`;

// reducer
const defaultState = {
  pending: false,
  error: false,
};

const initialState = {
  data: [],
  total: 0,
  preview: null,
  ...defaultState,
};

export default createReducer(
  {
    [FETCH_ALL]: defaultReducer((state, { payload: { data, total } }) => ({
      ...state,
      data,
      total,
      ...defaultState,
    })),
    [FIBERY_PREVIEW]: defaultReducer((state, { payload: { article } }) => ({
      ...state,
      preview: article,
      ...defaultState,
    })),
  },
  initialState
);

// selectors
const getState = state => state.admin.articles;
const isPending = state => getState(state).pending;
const getError = state => getState(state).error;
const getRawArticles = state => getState(state).data;
const getAll = (state, lang) => getLocalizedArticles(getRawArticles(state), lang);
const getPreview = (state, locale) => getLocalizedArticle(getState(state).preview, locale);

export const adminArticlesSelectors = {
  isPending,
  getError,
  getAll,
  getPreview,
};

// actions
export const adminArticlesActions = {
  fetchAll: () => ({
    type: FETCH_ALL,
    payload: makeRequest(api.articles.getChunk()),
  }),
  fiberyPreview: url => ({
    type: FIBERY_PREVIEW,
    payload: makeRequest(api.articles.fiberyPreview, 'POST', { url }),
  }),
};
