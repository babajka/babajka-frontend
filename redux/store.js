import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';

import { LOADING, SUCCESS, ERROR } from 'constants/redux';
import analytics from './middlewares/analytics';
import reducer from './ducks';

const middlewares = [
  thunkMiddleware,
  promiseMiddleware({ promiseTypeSuffixes: [LOADING, SUCCESS, ERROR] }),
  (__PROD__ || __STAGING__) && analytics,
].filter(Boolean);

export default (initialState = {}) =>
  createStore(
    reducer,
    initialState,
    // TODO(@drapegnik): disable dev tools in production
    composeWithDevTools(applyMiddleware(...middlewares))
  );
