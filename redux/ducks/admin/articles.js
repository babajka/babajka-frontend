import createReducer from 'type-to-reducer';

import api from 'constants/api';
import { defaultReducer } from 'utils/redux';
import { makeRequest } from 'utils/request';
import { getLocalizedArticles } from 'utils/getters';

const duck = 'admin/articles';

// constants
const FETCH_ALL = `${duck}/FETCH_ALL`;

// reducer
const defaultState = {
  pending: false,
  error: false,
};

const initialState = {
  data: [],
  total: 0,
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
  },
  initialState
);

// selectors
const getState = state => state.admin.articles;
const isPending = state => getState(state).pending;
const isError = state => getState(state).error;
const getRawArticles = state => getState(state).data;
const getAll = (state, lang) => getLocalizedArticles(getRawArticles(state), lang);

export const adminArticlesSelectors = {
  isPending,
  isError,
  getAll,
};

// actions
export const adminArticlesActions = {
  fetchAll: () => ({
    type: FETCH_ALL,
    payload: makeRequest(api.articles.getChunk()),
  }),
};
