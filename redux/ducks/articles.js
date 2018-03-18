import createReducer from 'type-to-reducer';

import { LOADING, SUCCESS, ERROR } from 'constants/redux';
import api from 'constants/api';
import request from 'utils/request';

const duck = 'articles';

// constants
const FETCH_ALL = `${duck}/FETCH_ALL`;

// reducer
const initialState = {
  pending: false,
  error: false,
  data: null,
};

export default createReducer(
  {
    [FETCH_ALL]: {
      [LOADING]: state => ({
        ...state,
        pending: true,
      }),
      [SUCCESS]: (state, { payload: { data } }) => ({
        ...state,
        data,
        pending: false,
      }),
      [ERROR]: (state, { payload }) => ({
        ...state,
        error: payload,
        pending: false,
      }),
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
};

const getLocalizedBrand = (brand, lang) => ({ slug: brand.slug, name: brand.names[lang] });

/* TODO: move to getters file */
const getAuthor = author => (author ? `${author.firstName} ${author.lastName}` : null);

const getLocalizedArticles = (articles, lang = 'be') =>
  articles.map(({ brand, type, locales, author }) => ({
    ...locales[lang],
    brand: getLocalizedBrand(brand, lang),
    author: getAuthor(author),
    type,
  }));

// selectors
const getState = state => state.articles;
const getAll = state => getLocalizedArticles(getState(state).data);
const isPending = state => getState(state).pending;
const isError = state => getState(state).error;

export const selectors = {
  getAll,
  isPending,
  isError,
};
