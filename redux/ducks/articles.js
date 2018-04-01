import createReducer from 'type-to-reducer';

import api from 'constants/api';
import request from 'utils/request';
import { getLocalizedArticles, getLocalizedBrands } from 'utils/getters';
import { defaultReducer } from 'utils/redux';

const duck = 'articles';

// constants
const FETCH_ALL = `${duck}/FETCH_ALL`;
const FETCH_CHUNK = `${duck}/FETCH_CHUNK`;
const FETCH_BY_SLUG = `${duck}/FETCH_BY_SLUG`;
const FETCH_BRANDS = `${duck}/FETCH_BRANDS`;
const CREATE = `${duck}/CREATE`;
const ADD_LOCALE = `${duck}/ADD_LOCALE`;

// reducer
const initialState = {
  pending: false,
  error: false,
  data: [],
  current: null,
  pagination: null,
  brands: null,
};

const currentReducer = defaultReducer((state, { payload }) => ({
  ...state,
  current: payload,
  pending: false,
}));

export default createReducer(
  {
    [FETCH_ALL]: defaultReducer((state, { payload: { data } }) => ({
      ...state,
      data,
      pending: false,
    })),
    [FETCH_CHUNK]: defaultReducer((state, { payload: { data, next } }) => ({
      ...state,
      data: [...state.data, ...data],
      pagination: next,
      pending: false,
    })),
    [FETCH_BY_SLUG]: currentReducer,
    [FETCH_BRANDS]: defaultReducer((state, { payload }) => ({
      ...state,
      brands: payload,
      pending: false,
    })),
    [CREATE]: currentReducer,
    // [ADD_LOCALE]: currentReducer, todo fix
  },
  initialState
);

// actions
export const actions = {
  fetchAll: () => ({
    type: FETCH_ALL,
    payload: request.fetch(api.articles.getAll),
  }),
  fetchChunk: (page, pageSize) => ({
    type: FETCH_CHUNK,
    payload: request.fetch(api.articles.getChunk(page, pageSize)),
  }),
  fetchBySlug: slug => ({
    type: FETCH_BY_SLUG,
    payload: request.fetch(api.articles.getBySlug(slug)),
  }),
  fetchBrands: () => ({
    type: FETCH_BRANDS,
    payload: request.fetch(api.articles.getBrands),
  }),
  create: article => ({
    type: CREATE,
    payload: request.fetch(api.articles.create, 'POST', article),
  }),
  addLocale: (articleId, locale) => ({
    type: ADD_LOCALE,
    payload: request.fetch(api.articles.addLocale(articleId), 'POST', locale),
  }),
};

// selectors
const getState = state => state.articles;
// TODO: pass current lang as second param
const getAll = state => getLocalizedArticles(getState(state).data);
const getPagination = state => getState(state).pagination;
const getCurrent = state => getState(state).current;
const getBrands = state => getLocalizedBrands(getState(state).brands);
const isPending = state => getState(state).pending;
const isError = state => getState(state).error;

export const selectors = {
  getAll,
  getPagination,
  getCurrent,
  getBrands,
  isPending,
  isError,
};
