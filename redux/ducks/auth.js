import createReducer from 'type-to-reducer';

import api from 'constants/api';
import request from 'utils/request';
import { defaultReducer } from 'utils/redux';

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
    [SIGNIN]: defaultReducer((state, { payload }) => ({
      ...state,
      user: payload,
      errors: {},
      pending: false,
    })),
    [SIGNOUT]: defaultReducer(state => ({
      ...state,
      user: null,
      pending: false,
    })),
    [GET_CURRENT_USER]: defaultReducer((state, { payload }) => ({
      ...state,
      user: payload,
      pending: false,
    })),
  },
  initialState
);

// actions
export const actions = {
  getCurrentUser: () => ({
    type: GET_CURRENT_USER,
    payload: request.fetch(api.users.getCurrent),
  }),
  signIn: ({ isSignUp = false, ...data }) => ({
    type: SIGNIN,
    payload: isSignUp
      ? request.fetch(api.auth.register, 'POST', data)
      : request.fetch(api.auth.login, 'POST', data),
    meta: {
      ga: true,
    },
  }),
  signOut: () => ({
    type: SIGNOUT,
    payload: request.fetch(api.auth.logout),
  }),
};

// selectors
const getState = state => state.auth;
const getUser = state => getState(state).user;
const getPermissions = state => {
  const user = getUser(state);
  return user ? user.permissions : {};
};

export const selectors = {
  getUser,
  getPermissions,
};
