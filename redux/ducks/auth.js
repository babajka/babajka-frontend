import { createDuck } from 'redux-duck';

const duck = createDuck('auth');

// constants
const LOGIN = duck.defineType('LOGIN');

// reducers
const initialState = {
  user: null,
};

export default duck.createReducer({
  [LOGIN]: (state, { payload }) => ({
    ...state,
    user: payload,
  }),
}, initialState);

// actions
export const actions = {
  login: (email, password) => duck.createAction(LOGIN)({ email, password }),
};
