import { useMemo } from 'react';
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
  (process.env.isProd || process.env.isStaging) && analytics,
  form,
].filter(Boolean);

const initStore = (preloadedState = {}) =>
  createStore(reducer, preloadedState, composeWithDevTools(applyMiddleware(...middlewares)));

let store;

export const initializeStore = preloadedState => {
  // eslint-disable-next-line no-underscore-dangle
  let _store = store ?? initStore(preloadedState);

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    });
    // Reset the current store
    store = undefined;
  }

  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') {
    return _store;
  }
  // Create the store once in the client
  if (!store) {
    store = _store;
  }

  return _store;
};

export const useStore = initialState =>
  useMemo(() => initializeStore(initialState), [initialState]);
