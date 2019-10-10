import createReducer from 'type-to-reducer';
import moment from 'moment';

import api from 'constants/api';

import { makeRequest } from 'utils/request';
import { defaultReducer } from 'utils/redux';
import { getDiary, getLocalizedTag } from 'utils/getters';

const duck = 'specials/diary';

// constants
const GET_BY_DAY = `${duck}/GET_BY_DAY`;

const initialState = {
  pending: false,
  error: false,
  data: {},
  next: null,
  prev: null,
};

export default createReducer(
  {
    [GET_BY_DAY]: defaultReducer((state, { payload: { data, next, prev } }) => ({
      ...state,
      data: data && getDiary(data),
      next,
      prev,
      pending: false,
    })),
  },
  initialState
);

// selectors
const getState = state => state.diary;
const getData = state => getState(state).data;
const getCurrent = (state, lang) => {
  const { author, ...rest } = getData(state);
  return { ...rest, author: author && getLocalizedTag(author, lang).content };
};
const isPending = state => getState(state).pending;
const isError = state => getState(state).error;
const isNextAvailable = state => {
  const { next } = getState(state);
  if (!next) {
    return false;
  }
  const now = moment();
  const { month, day } = next;
  const nowHash = (now.month() + 1) * 100 + now.date();
  const nextHash = +month * 100 + +day;
  return nextHash <= nowHash;
};

export const diarySelectors = {
  getCurrent,
  getState,
  isPending,
  isError,
  isNextAvailable,
};

// actions
export const diaryActions = {
  getByDay: (month = new Date().getMonth() + 1, day = new Date().getDate()) => ({
    type: GET_BY_DAY,
    payload: makeRequest(api.diary.getByDay(month, day)),
  }),
  getClosest: closest => (dispatch, getStore) => {
    const diary = getState(getStore());
    const { month, day } = diary[closest];
    dispatch({
      type: GET_BY_DAY,
      payload: makeRequest(api.diary.getByDay(month, day)),
    });
  },
};
