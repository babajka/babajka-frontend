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

export default createReducer({
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
}, initialState);

// actions
export const actions = {
  fetchAll: () => ({
    type: FETCH_ALL,
    payload: request(api.articles.getAll),
  }),
};