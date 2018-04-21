import createReducer from 'type-to-reducer';

import api from 'constants/api';
import { DEFAULT_LOCALE } from 'constants';

import request from 'utils/request';
import { defaultReducer } from 'utils/redux';
import { getDate } from 'utils/getters';

const duck = 'specials/diary';

// constants
const GET_BY_DAY = `${duck}/GET_BY_DAY`;

const initialState = {
  pending: false,
  error: false,
  data: null,
  next: null,
  prev: null,
};

export default createReducer(
  {
    [GET_BY_DAY]: defaultReducer(
      (state, { payload: { data: { day, month, year, ...rest }, next, prev } }) => ({
        ...state,
        data: {
          ...rest,
          date: getDate(day, month, year),
        },
        next,
        prev,
        pending: false,
      })
    ),
  },
  initialState
);

// actions
export const actions = {
  getByDay: (
    locale = DEFAULT_LOCALE,
    month = new Date().getMonth() + 1,
    day = new Date().getDate()
  ) => ({
    type: GET_BY_DAY,
    payload: request.fetch(api.diary.getByDay(locale, month, day)),
  }),
  getClosest: closest => (dispatch, getState) => {
    const { month, day } = getState().diary[closest];
    dispatch({
      type: GET_BY_DAY,
      payload: request.fetch(api.diary.getByDay(DEFAULT_LOCALE, month, day)),
    });
  },
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
