import createReducer from 'type-to-reducer';

import api from 'constants/api';
import { defaultReducer } from 'utils/redux';
import request from 'utils/request';
import {
  getLocalizedArticles,
  getLocalizedArticle,
  getLocalizedBrands,
  getLocalizedAuthors,
  getLocalesBySlug,
  getShortLocale,
} from 'utils/getters';
import { PAGE_SIZE, MAIN_PAGE_SIZE } from 'constants/articles';

const duck = 'articles';

// constants
const INITIAL_FETCH = `${duck}/INITIAL_FETCH`;
const FETCH_CHUNK = `${duck}/FETCH_CHUNK`;
const MERGE_CACHED = `${duck}/MERGE_CACHED`;
const FETCH_BY_SLUG = `${duck}/FETCH_BY_SLUG`;
const FETCH_BRANDS = `${duck}/FETCH_BRANDS`;
const FETCH_AUTHORS = `${duck}/FETCH_AUTHORS`;
const CREATE = `${duck}/CREATE`;
const UPDATE = `${duck}/UPDATE`;

// reducer
const initialState = {
  pending: false,
  error: false,
  data: [],
  nextData: [],
  current: null,
  pagination: {},
  nextPagination: {},
  localeBySlug: {},
  brands: null,
};

const defaultState = {
  pending: false,
  error: false,
  errors: {},
};

const currentReducer = defaultReducer((state, { payload }) => ({
  ...state,
  current: payload,
  localeBySlug: getLocalesBySlug(payload),
  ...defaultState,
}));

export default createReducer(
  {
    [INITIAL_FETCH]: defaultReducer((state, { payload: { data, next } }) => ({
      ...state,
      data,
      pagination: next,
      ...defaultState,
    })),
    [FETCH_CHUNK]: defaultReducer((state, { payload: { data, next } }) => ({
      ...state,
      nextData: data,
      nextPagination: next,
      ...defaultState,
    })),
    [MERGE_CACHED]: state => ({
      ...state,
      data: [...state.data, ...state.nextData],
      nextData: [],
      pagination: state.nextPagination,
    }),
    [FETCH_BY_SLUG]: currentReducer,
    [FETCH_BRANDS]: defaultReducer((state, { payload }) => ({
      ...state,
      brands: payload,
      ...defaultState,
    })),
    [FETCH_AUTHORS]: defaultReducer((state, { payload }) => ({
      ...state,
      authors: payload,
      ...defaultState,
    })),
    [CREATE]: currentReducer,
    [UPDATE]: currentReducer,
  },
  initialState
);

// actions
export const actions = {
  initialFetch: () => ({
    type: INITIAL_FETCH,
    payload: request.fetch(api.articles.getChunk({ page: 0, pageSize: MAIN_PAGE_SIZE })),
  }),
  fetchChunk: (page = 0, pageSize = PAGE_SIZE) => ({
    type: FETCH_CHUNK,
    payload: request.fetch(api.articles.getChunk({ page, pageSize })),
  }),
  mergeCached: () => ({
    type: MERGE_CACHED,
  }),
  fetchBySlug: slug => ({
    type: FETCH_BY_SLUG,
    payload: request.fetch(api.articles.getBySlug(slug)),
  }),
  fetchBrands: () => ({
    type: FETCH_BRANDS,
    payload: request.fetch(api.articles.getBrands),
  }),
  fetchAuthors: () => ({
    type: FETCH_AUTHORS,
    payload: request.fetch(api.articles.getAuthors),
  }),
  create: article => ({
    type: CREATE,
    payload: request.fetch(api.articles.create, 'POST', article),
    meta: {
      ga: true,
    },
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
const getErrors = state => getState(state).errors;

const getRawArticles = state => getState(state).data;
const getAll = (state, lang) => getLocalizedArticles(getRawArticles(state), lang);

const getNextPage = state => getState(state).pagination.page;
const getNextNextPage = state => getState(state).nextPagination.page;

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

const getRawAuthors = state => getState(state).authors;
const getAuthors = (state, lang) => getLocalizedAuthors(getRawAuthors(state), lang);

export const selectors = {
  getAll,
  getNextPage,
  getNextNextPage,
  getRawCurrent,
  getCurrent,
  getLocaleBySlug,
  getOtherLocales,
  getBrands,
  getAuthors,
  isPending,
  isError,
  getErrors,
};
