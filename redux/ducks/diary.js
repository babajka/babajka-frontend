import createReducer from 'type-to-reducer';

import api from 'constants/api';
import request from 'utils/request';
import { defaultReducer } from 'utils/redux';

const duck = 'specials/diary';

// constants
const GET_BY_DAY = `${duck}/GET_BY_DAY`;

const initialState = {
  pending: false,
  error: false,
  data: null,
};

export default createReducer(
  {
    [GET_BY_DAY]: defaultReducer((state, { payload }) => ({
      ...state,
      data: payload,
      pending: false,
    })),
  },
  initialState
);

// actions
export const actions = {
  getByDay: (locale = 'be', month = new Date().getMonth() + 1, day = new Date().getDate()) => ({
    type: GET_BY_DAY,
    payload: request.fetch(api.diary.getByDay(locale, month, day)),
  }),
};

// selectors
const getState = state => state.diary;
const getCurrent = state => getState(state).data;
const isPending = state => getState(state).pending;
const isError = state => getState(state).error;

export const selectors = {
  getCurrent,
  getState,
  isPending,
  isError,
};
