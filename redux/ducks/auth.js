import createReducer from 'type-to-reducer';

import { SUCCESS } from 'constants/redux';
import request from 'utils/request';
import api from 'constants/api';

const duck = 'auth';

// constants
const LOGIN = `${duck}/LOGIN`;

// reducer
const initialState = {
  user: null,
};

export default createReducer({
  [LOGIN]: {
    [SUCCESS]: (state, { payload }) => ({
      ...state,
      user: payload,
    }),
  },
}, initialState);

// actions
export const actions = {
  login: (email, password) => ({
    type: LOGIN,
    payload: request(api.auth.login, 'POST', { email, password }),
  }),
};
