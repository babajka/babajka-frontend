import createReducer from 'type-to-reducer';

import api from 'constants/api';
import { defaultReducer } from 'utils/redux';
import { makeRequest } from 'utils/request';
import { getLocalizedArticle } from 'utils/getters';

const duck = 'admin/articles';

// constants
const FETCH_BY_SLUG = `${duck}/FETCH_BY_SLUG`;

// reducer
const initialState = {
  pending: false,
  error: false,
  current: null,
};

export default createReducer(
  {
    [FETCH_BY_SLUG]: defaultReducer((state, { payload }) => ({
      ...state,
      pending: false,
      current: payload,
    })),
  },
  initialState
);

// selectors
const getState = state => state.articles;
const isPending = state => getState(state).pending;
const isError = state => getState(state).error;
const getErrors = state => getState(state).errors;

const getRawCurrent = state => getState(state).current;
const getLocaleBySlug = (state, slug) => getState(state).localeBySlug[slug];
const getCurrent = (state, slug) =>
  getLocalizedArticle(getRawCurrent(state), getLocaleBySlug(state, slug));

export const adminArticlesSelectors = {
  getCurrent,

  isPending,
  isError,
  getErrors,
};

// actions
export const adminArticlesActions = {
  fetchBySlug: slug => ({
    type: FETCH_BY_SLUG,
    payload: makeRequest(api.articles.getBySlug(slug)),
  }),
};
