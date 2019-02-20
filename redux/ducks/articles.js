import createReducer from 'type-to-reducer';

import api from 'constants/api';
import { defaultReducer } from 'utils/redux';
import { makeRequest } from 'utils/request';
import {
  getLocalizedArticles,
  getLocalizedArticle,
  getLocalizedBrands,
  getLocalizedAuthors,
  getLocalizedCollections,
  getLocalesBySlug,
  getShortLocale,
} from 'utils/getters';
import { PAGE_SIZE, MAIN_PAGE_SIZE } from 'constants/articles';
import { LOCALES } from 'constants';

const duck = 'articles';

// constants
const INITIAL_FETCH = `${duck}/INITIAL_FETCH`;
const FETCH_CHUNK = `${duck}/FETCH_CHUNK`;
const MERGE_CACHED = `${duck}/MERGE_CACHED`;
const FETCH_BY_SLUG = `${duck}/FETCH_BY_SLUG`;
const FETCH_BRANDS = `${duck}/FETCH_BRANDS`;
const FETCH_AUTHORS = `${duck}/FETCH_AUTHORS`;
const FETCH_COLLECTIONS = `${duck}/FETCH_COLLECTIONS`;
const CREATE = `${duck}/CREATE`;
const UPDATE = `${duck}/UPDATE`;
const REMOVE = `${duck}/REMOVE`;

// reducer
const initialState = {
  pending: false,
  error: false,
  data: [],
  nextData: [],
  total: 0,
  current: null,
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
    [INITIAL_FETCH]: defaultReducer((state, { payload: { data, total } }) => ({
      ...state,
      data,
      total,
      ...defaultState,
    })),
    [FETCH_CHUNK]: defaultReducer((state, { payload: { data, total } }) => ({
      ...state,
      nextData: data,
      total,
      ...defaultState,
    })),
    [MERGE_CACHED]: state => ({
      ...state,
      data: [...state.data, ...state.nextData],
      nextData: [],
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
    [FETCH_COLLECTIONS]: defaultReducer((state, { payload }) => ({
      ...state,
      collections: payload,
      ...defaultState,
    })),
    [CREATE]: currentReducer,
    [UPDATE]: currentReducer,
  },
  initialState
);

// selectors
const getState = state => state.articles;
const isPending = state => getState(state).pending;
const isError = state => getState(state).error;
const getErrors = state => getState(state).errors;

const getRawArticles = state => getState(state).data;
const getAll = (state, lang) => getLocalizedArticles(getRawArticles(state), lang);
const getTotal = state => getState(state).total;
const getCurrentArticlesLength = state => getRawArticles(state).length;
const getCachedArticlesLength = state => getState(state).nextData.length;

const getRawCurrent = state => getState(state).current;
const getLocaleBySlug = (state, slug) => getState(state).localeBySlug[slug];
const getOtherLocales = (state, currentLocale) =>
  Object.entries(getRawCurrent(state).locales)
    .filter(([locale]) => LOCALES[locale]) // TODO(drapegnik): add logging here
    .filter(([locale]) => locale !== currentLocale)
    .map(([_, locale]) => locale)
    .map(getShortLocale);
const getCurrent = (state, slug) =>
  getLocalizedArticle(getRawCurrent(state), getLocaleBySlug(state, slug));

const getRawBrands = state => getState(state).brands;
const getBrands = (state, lang) => getLocalizedBrands(getRawBrands(state), lang);

const getRawAuthors = state => getState(state).authors;
const getAuthors = (state, lang) => getLocalizedAuthors(getRawAuthors(state), lang);

const getRawCollections = state => getState(state).collections;
const getColletions = (state, lang) => getLocalizedCollections(getRawCollections(state), lang);

export const selectors = {
  getAll,
  getTotal,
  getCachedArticlesLength,

  getRawCurrent,
  getCurrent,
  getLocaleBySlug,
  getOtherLocales,
  getBrands,
  getAuthors,
  getColletions,

  isPending,
  isError,
  getErrors,
};

// actions
export const actions = {
  initialFetch: () => ({
    type: INITIAL_FETCH,
    payload: makeRequest(api.articles.getChunk({ skip: 0, take: MAIN_PAGE_SIZE })),
  }),
  fetchChunk: () => (dispatch, getStore) => {
    const store = getStore();
    const total = getTotal(store);
    const currentLength = getCurrentArticlesLength(store);
    const cachedLength = getCachedArticlesLength(store);

    const skip = currentLength + cachedLength;
    if (skip < total) {
      return dispatch({
        type: FETCH_CHUNK,
        payload: makeRequest(api.articles.getChunk({ skip, take: PAGE_SIZE })),
      });
    }
    return Promise.resolve();
  },
  mergeCached: () => ({
    type: MERGE_CACHED,
  }),
  fetchBySlug: slug => ({
    type: FETCH_BY_SLUG,
    payload: makeRequest(api.articles.getBySlug(slug)),
  }),
  fetchBrands: () => ({
    type: FETCH_BRANDS,
    payload: makeRequest(api.articles.getBrands),
  }),
  fetchAuthors: () => ({
    type: FETCH_AUTHORS,
    payload: makeRequest(api.articles.getAuthors),
  }),
  fetchCollections: () => ({
    type: FETCH_COLLECTIONS,
    payload: makeRequest(api.articles.getColletions),
  }),
  create: article => ({
    type: CREATE,
    payload: makeRequest(api.articles.create, 'POST', article),
    meta: {
      ga: true,
    },
  }),
  update: article => ({
    type: UPDATE,
    payload: makeRequest(api.articles.update(article._id), 'PUT', article),
  }),
  remove: articleId => ({
    type: REMOVE,
    payload: makeRequest(api.articles.remove(articleId), 'DELETE'),
  }),
};
