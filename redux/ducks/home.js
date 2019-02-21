import createReducer from 'type-to-reducer';
import fromPairs from 'lodash/fromPairs';
import keyBy from 'lodash/keyBy';

import api from 'constants/api';

import { makeRequest } from 'utils/request';
import { defaultReducer } from 'utils/redux';
import {
  getLocalizedArticles,
  getLocalizedBrands,
  getLocalizedTags,
  getTopics,
} from 'utils/getters';

const duck = 'home';

// constants
const FETCH = `${duck}/FETCH`;

// reducer
const initialState = {
  pending: false,
  error: false,
  blocks: [],
  data: {},
};

export default createReducer(
  {
    [FETCH]: defaultReducer((state, { payload: { blocks, data } }) => ({
      ...state,
      blocks,
      data,
    })),
  },
  initialState
);

const GETTER_BY_TYPE = {
  articles: getLocalizedArticles,
  brands: getLocalizedBrands,
  tags: getLocalizedTags,
  topics: getTopics,
  latestArticles: getLocalizedArticles,
};

const SKIP_MAP_BY_ID = ['latestArticles'];

// selectors
const getState = state => state.home;
const getBlocks = state => getState(state).blocks;
const getData = (state, lang) => {
  const { data } = getState(state);
  // localization
  return fromPairs(
    Object.entries(data).map(([type, list]) => {
      const localizedList = GETTER_BY_TYPE[type](list, lang);
      if (SKIP_MAP_BY_ID.includes(type)) {
        return [type, localizedList];
      }
      return [type, keyBy(localizedList, 'id')];
    })
  );
};
const isPending = state => getState(state).pending;
const isError = state => getState(state).error;

export const homeSelectors = {
  getBlocks,
  getData,
  isPending,
  isError,
};

// actions
export const homeActions = {
  fetch: () => ({
    type: FETCH,
    payload: makeRequest(api.home.get),
  }),
};
