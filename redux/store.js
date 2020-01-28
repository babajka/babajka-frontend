import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import thunkMiddleware from 'redux-thunk';
import { createPromise } from 'redux-promise-middleware';

import { LOADING, SUCCESS, ERROR } from 'constants/redux';
import analytics from './middlewares/analytics';
import form from './middlewares/form';
import reducer from './ducks';

const middlewares = [
  thunkMiddleware,
  createPromise({ promiseTypeSuffixes: [LOADING, SUCCESS, ERROR] }),
  (__PROD__ || __STAGING__) && analytics,
  form,
].filter(Boolean);

export default (initialState = {}) =>
  createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middlewares)));
