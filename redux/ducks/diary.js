import createReducer from 'type-to-reducer';
import moment from 'moment';

import api from 'constants/api';
import { MINSK_TZ_OFFSET } from 'constants/server';

import { makeRequest } from 'utils/request';
import { defaultReducer } from 'utils/redux';
import { getDiary, getLocalizedTag } from 'utils/getters';

const duck = 'specials/diary';

// constants
const GET_BY_DAY = `${duck}/GET_BY_DAY`;
const GET_BY_SLUG = `${duck}/GET_BY_SLUG`;

const DUMMY_DIARY = {
  slug: 'sample',
  date: 123,
};

const initialState = {
  pending: false,
  error: false,
  data: DUMMY_DIARY,
  next: null,
  prev: null,
};

const diaryReducer = defaultReducer((state, { payload: { data, next, prev } }) => ({
  ...state,
  data: data && getDiary(data),
  next,
  prev,
  pending: false,
}));

export default createReducer(
  {
    [GET_BY_DAY]: diaryReducer,
    [GET_BY_SLUG]: diaryReducer,
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
const getPrev = state => getState(state).prev;
const getNext = state => getState(state).next;
const isPending = state => getState(state).pending;
const isError = state => getState(state).error;
const isNextAvailable = state => {
  const { data, next } = getState(state);
  if (!next) {
    return false;
  }
  // HACK: during ssr we have different timezone
  const now = moment.utc().utcOffset(MINSK_TZ_OFFSET);
  const { month, day } = data;
  const nowHash = (now.month() + 1) * 100 + now.date();
  const currentHash = +month * 100 + +day;
  return currentHash !== nowHash;
};

export const diarySelectors = {
  getCurrent,
  getPrev,
  getNext,
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
  getBySlug: slug => ({
    type: GET_BY_SLUG,
    payload: makeRequest(slug ? api.diary.getBySlug(slug) : api.diary.today),
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
