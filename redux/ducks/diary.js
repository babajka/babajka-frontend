import createReducer from 'type-to-reducer';

import api from 'constants/api';
import { DEFAULT_LOCALE } from 'constants';

import { makeRequest } from 'utils/request';
import { defaultReducer } from 'utils/redux';
import { getDiary } from 'utils/getters';

const duck = 'specials/diary';

// constants
const GET_BY_DAY = `${duck}/GET_BY_DAY`;

const initialState = {
  pending: false,
  error: false,
  data: {
    author: '',
    text: '',
    date: Date.now(),
  },
  next: null,
  prev: null,
};

export default createReducer(
  {
    [GET_BY_DAY]: defaultReducer((state, { payload: { data, next, prev } }) => ({
      ...state,
      data: getDiary(data),
      next,
      prev,
      pending: false,
    })),
  },
  initialState
);

// selectors
const getState = state => state.diary;
const getCurrent = state => getState(state).data;
const isPending = state => getState(state).pending;
const isError = state => getState(state).error;

export const diarySelectors = {
  getCurrent,
  getState,
  isPending,
  isError,
};

// actions
export const diaryActions = {
  getByDay: (
    locale = DEFAULT_LOCALE,
    month = new Date().getMonth() + 1,
    day = new Date().getDate()
  ) => ({
    type: GET_BY_DAY,
    payload: makeRequest(api.diary.getByDay(locale, month, day)),
  }),
  getClosest: closest => (dispatch, getStore) => {
    const diary = getState(getStore());
    const { month, day } = diary[closest];
    dispatch({
      type: GET_BY_DAY,
      payload: makeRequest(api.diary.getByDay(DEFAULT_LOCALE, month, day)),
    });
  },
};
