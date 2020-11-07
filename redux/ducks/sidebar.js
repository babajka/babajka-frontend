import createReducer from 'type-to-reducer';

import api from 'constants/api';

import { makeRequest } from 'utils/request';
import { defaultReducer } from 'utils/redux';
import { localizeData } from 'utils/getters';

const duck = 'sidebar';

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

// selectors
const getState = state => state.sidebar;
const getBlocks = state => getState(state).blocks;
const getData = (state, lang) => localizeData(getState(state).data, lang);

export const sidebarSelectors = {
  getBlocks,
  getData,
};

// actions
export const sidebarActions = {
  fetch: () => ({
    type: FETCH,
    payload: makeRequest(api.storage.getSidebar),
  }),
};
