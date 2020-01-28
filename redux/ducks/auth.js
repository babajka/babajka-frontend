import createReducer from 'type-to-reducer';

import api from 'constants/api';
import { makeRequest } from 'utils/request';
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
    [SIGNIN]: defaultReducer((state, { payload: { user } }) => ({
      ...state,
      user,
      errors: {},
      pending: false,
    })),
    [SIGNOUT]: defaultReducer(state => ({
      ...state,
      user: null,
      pending: false,
    })),
    [GET_CURRENT_USER]: defaultReducer((state, { payload: { user } }) => ({
      ...state,
      user,
      pending: false,
    })),
  },
  initialState
);

// selectors
const getState = state => state.auth;
const getUser = state => getState(state).user;
const getPermissions = state => {
  const user = getUser(state);
  return user ? user.permissions : {};
};

export const authSelectors = {
  getUser,
  getPermissions,
};

// actions
export const authActions = {
  getCurrentUser: () => ({
    type: GET_CURRENT_USER,
    payload: makeRequest(api.users.getCurrent),
  }),
  signIn: ({ isSignUp = false, ...data }) => ({
    type: SIGNIN,
    payload: makeRequest(isSignUp ? api.auth.register : api.auth.login, 'POST', data),
    meta: {
      ga: true,
    },
  }),
  signOut: () => ({
    type: SIGNOUT,
    payload: makeRequest(api.auth.logout),
  }),
};
