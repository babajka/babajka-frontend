import createReducer from 'type-to-reducer';

import api from 'constants/api';

import { makeRequest } from 'utils/request';
import { defaultReducer } from 'utils/redux';
import { localizeData } from 'utils/storage';

const duck = 'home';

// constants
const FETCH = `${duck}/FETCH`;
const SUBSCRIBE = `${duck}/SUBSCRIBE`;

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

// selectors
const getState = state => state.home;
const getBlocks = state => getState(state).blocks;
const getData = (state, lang) => localizeData(getState(state).data, lang);
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
    payload: makeRequest(api.storage.getMainPage),
  }),
  subscribe: form => ({
    type: SUBSCRIBE,
    payload: makeRequest(api.core.subscribe, 'POST', form),
    meta: {
      ga: true,
    },
  }),
};
