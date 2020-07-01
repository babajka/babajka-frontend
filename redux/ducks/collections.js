import createReducer from 'type-to-reducer';

import omit from 'lodash/omit';

import api from 'constants/api';
import { defaultReducer } from 'utils/redux';
import { makeRequest } from 'utils/request';
import { getLocalizedCollection, getLocalizedArticles, getArticlesBlocks } from 'utils/getters';

const duck = 'collections';

// constants
const FETCH_COLLECTION = `${duck}/FETCH_COLLECTION`;

// reducer
const initialState = {
  pending: false,
  error: false,
  collection: null,
};

export default createReducer(
  {
    [FETCH_COLLECTION]: defaultReducer((state, { payload }) => ({
      ...state,
      ...payload,
    })),
  },
  initialState
);

// selectors
const getState = state => state.collections;
const getData = (state, lang) => {
  const { collection } = getState(state);
  const localizedArticles = getLocalizedArticles(collection.articles, lang);

  const authors = Object.values(
    localizedArticles.reduce((acc, { tagsByTopic: { authors: articleAuthors } }) => {
      articleAuthors.forEach(authorTag => {
        acc[authorTag.slug] = authorTag;
      });
      return acc;
    }, {})
  );

  return {
    collection: getLocalizedCollection(omit(collection, ['articles']), lang),
    blocks: getArticlesBlocks(localizedArticles),
    articlesCount: localizedArticles.length,
    authors,
  };
};

// selectors
export const collectionsSelectors = {
  getData,
};

// actions
export const collectionsActions = {
  fetchOne: slug => ({
    type: FETCH_COLLECTION,
    payload: makeRequest(api.collections.getOne(slug)),
  }),
};
