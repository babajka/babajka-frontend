import createReducer from 'type-to-reducer';

import api from 'constants/api';
import { defaultReducer } from 'utils/redux';
import request from 'utils/request';
import {
  getLocalizedArticles,
  getLocalizedArticle,
  getLocalizedBrands,
  getLocalesBySlug,
  getShortLocale,
} from 'utils/getters';

const duck = 'articles';

// constants
const FETCH_ALL = `${duck}/FETCH_ALL`;
const FETCH_CHUNK = `${duck}/FETCH_CHUNK`;
const FETCH_BY_SLUG = `${duck}/FETCH_BY_SLUG`;
const FETCH_BRANDS = `${duck}/FETCH_BRANDS`;
const CREATE = `${duck}/CREATE`;
const UPDATE = `${duck}/UPDATE`;

// reducer
const initialState = {
  pending: false,
  error: false,
  data: [],
  current: null,
  pagination: null,
  localeBySlug: {},
  brands: null,
};

const currentReducer = defaultReducer((state, { payload }) => ({
  ...state,
  current: payload,
  localeBySlug: getLocalesBySlug(payload),
  pending: false,
}));

const FIRST_PAGE = 0;

export default createReducer(
  {
    [FETCH_ALL]: defaultReducer((state, { payload: { data } }) => ({
      ...state,
      data,
      pending: false,
    })),
    [FETCH_CHUNK]: defaultReducer((state, { payload: { data, next } }) => ({
      ...state,
      data: next.page === FIRST_PAGE + 1 ? data : [...state.data, ...data],
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
    [UPDATE]: currentReducer,
  },
  initialState
);

const DEFAULT_PAGE_SIZE = 8;

// actions
export const actions = {
  fetchAll: () => ({
    type: FETCH_ALL,
    payload: request.fetch(api.articles.getAll()),
  }),
  fetchChunk: (page = FIRST_PAGE, pageSize = DEFAULT_PAGE_SIZE) => ({
    type: FETCH_CHUNK,
    payload: request.fetch(api.articles.getAll({ page, pageSize })),
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
  update: article => ({
    type: UPDATE,
    payload: request.fetch(api.articles.update(article._id), 'PUT', article),
  }),
};

// selectors
const getState = state => state.articles;
const isPending = state => getState(state).pending;
const isError = state => getState(state).error;

const getRawArticles = state => getState(state).data;
const getAll = (state, lang) => getLocalizedArticles(getRawArticles(state), lang);

const getNextPage = state => getState(state).pagination.page;

const getRawCurrent = state => getState(state).current;
const getLocaleBySlug = (state, slug) => getState(state).localeBySlug[slug];
const getOtherLocales = (state, currentLocale) =>
  Object.entries(getRawCurrent(state).locales)
    .filter(([locale]) => locale !== currentLocale)
    .map(([_, locale]) => locale)
    .map(getShortLocale);
const getCurrent = (state, slug) =>
  getLocalizedArticle(getRawCurrent(state), getLocaleBySlug(state, slug));

const getRawBrands = state => getState(state).brands;
const getBrands = (state, lang) => getLocalizedBrands(getRawBrands(state), lang);

export const selectors = {
  getAll,
  getNextPage,
  getRawCurrent,
  getCurrent,
  getLocaleBySlug,
  getOtherLocales,
  getBrands,
  isPending,
  isError,
};
