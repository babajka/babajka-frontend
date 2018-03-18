import createReducer from 'type-to-reducer';

import { LOADING, SUCCESS, ERROR } from 'constants/redux';
import api from 'constants/api';
import request from 'utils/request';
import { getLocalizedArticles } from 'utils/getters';

const duck = 'articles';

// constants
const FETCH_ALL = `${duck}/FETCH_ALL`;
const FETCH_BY_SLUG = `${duck}/FETCH_BY_SLUG`;

// reducer
const initialState = {
  pending: false,
  error: false,
  data: null,
  current: null,
};

const pendingReducer = state => ({
  ...state,
  pending: true,
});

const errorReducer = (state, { payload }) => ({
  ...state,
  error: payload,
  pending: false,
});

export default createReducer(
  {
    [FETCH_ALL]: {
      [LOADING]: pendingReducer,
      [SUCCESS]: (state, { payload: { data } }) => ({
        ...state,
        data,
        pending: false,
      }),
      [ERROR]: errorReducer,
    },
    [FETCH_BY_SLUG]: {
      [LOADING]: pendingReducer,
      [SUCCESS]: (state, { payload }) => ({
        ...state,
        current: payload,
        pending: false,
      }),
      [ERROR]: errorReducer,
    },
  },
  initialState
);

// actions
export const actions = {
  fetchAll: () => ({
    type: FETCH_ALL,
    payload: request.fetch(api.articles.getAll),
  }),
  fetchBySlug: slug => ({
    type: FETCH_BY_SLUG,
    payload: request.fetch(api.articles.getBySlug(slug)),
  }),
};

// selectors
const getState = state => state.articles;
const getAll = state => getLocalizedArticles(getState(state).data);
const getCurrent = state => getState(state).current;
const isPending = state => getState(state).pending;
const isError = state => getState(state).error;

export const selectors = {
  getAll,
  getCurrent,
  isPending,
  isError,
};
