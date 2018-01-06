import createReducer from 'type-to-reducer';

import { ERROR, LOADING, SUCCESS } from 'constants/redux';
import request from 'utils/request';
import api from 'constants/api';

const duck = 'auth';

// constants
const SIGNIN = `${duck}/SIGNIN`;
const SIGNOUT = `${duck}/SIGNOUT`;
const GET_CURRENT_USER = `${duck}/GET_CURRENT_USER`;

// reducer
const initialState = {
  user: null,
  pending: false,
  errors: {},
};

export default createReducer(
  {
    [SIGNIN]: {
      [LOADING]: state => ({
        ...state,
        pending: true,
      }),
      [SUCCESS]: (state, { payload }) => ({
        ...state,
        user: payload,
        errors: {},
        pending: false,
      }),
      [ERROR]: (state, { payload }) => ({
        ...state,
        errors: payload,
        pending: false,
      }),
    },
    [SIGNOUT]: {
      [SUCCESS]: state => ({
        ...state,
        user: null,
      }),
    },
    [GET_CURRENT_USER]: {
      [SUCCESS]: (state, { payload }) => ({
        ...state,
        user: payload,
      }),
    },
  },
  initialState
);

// actions
export const actions = {
  getCurrentUser: () => ({
    type: GET_CURRENT_USER,
    payload: request.fetch(api.users.getCurrent),
  }),
  signIn: (data, signUp = false) => ({
    type: SIGNIN,
    payload: signUp
      ? request.fetch(api.auth.register, 'POST', data)
      : request.fetch(api.auth.login, 'POST', data),
  }),
  signOut: () => ({
    type: SIGNOUT,
    payload: request(api.auth.logout),
  }),
};

// selectors
const getState = state => state.auth;
const getUser = state => getState(state).user;
const isLoginPending = state => getState(state).pending;
const getLoginErrors = state => getState(state).errors;

export const selectors = {
  getUser,
  isLoginPending,
  getLoginErrors,
};
