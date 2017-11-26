import createReducer from 'type-to-reducer';

import { ERROR, LOADING, SUCCESS } from 'constants/redux';
import request from 'utils/request';
import api from 'constants/api';

const duck = 'auth';

// constants
const SIGNIN = `${duck}/SIGNIN`;

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
        user: null, // TODO(@drapegnik): for testing, to remove
        errors: payload,
        pending: false,
      }),
    },
  },
  initialState
);

// actions
export const actions = {
  signIn: (data, signUp = false) => ({
    type: SIGNIN,
    payload: signUp
      ? request(api.auth.register, 'POST', data)
      : request(api.auth.login, 'POST', data),
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
