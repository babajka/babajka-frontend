import createReducer from 'type-to-reducer';

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
  const data = getData(state);
  if (!data) {
    return data;
  }
  const { author } = data;
  return { ...data, author: author && getLocalizedTag(author, lang).content };
};
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
