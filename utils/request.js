import fetch from 'isomorphic-fetch';
import nextCookie from 'next-cookies';
import castArray from 'lodash/castArray';

import { Router, ROUTES_NAMES } from 'routes';
import api from 'constants/api';
import { BACKEND_URL } from 'constants/server';
import { DEFAULT_LOCALE } from 'constants';

const NOT_FOUND = 'Not Found';

const DEFAULT_OPTIONS = {
  mode: 'cors',
  credentials: 'same-origin',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

// HACK: https://github.com/zeit/next.js/issues/2455
let cookie = null;

const getCookieString = cookies =>
  Object.entries(cookies).reduce((acc, [key, value]) => `${acc}${key}=${value};`, '');

const getOptions = options => {
  const mergedOptions = { ...DEFAULT_OPTIONS, ...options };
  if (cookie) {
    mergedOptions.headers.cookie = getCookieString(cookie);
  }
  return mergedOptions;
};

export const uploadFile = file => {
  const fd = new FormData();
  fd.append('image', file);
  return fetch(api.core.uploads, {
    mode: DEFAULT_OPTIONS.mode,
    credentials: DEFAULT_OPTIONS.credentials,
    method: 'POST',
    body: fd,
  }).then(res => res.json());
};

export const makeRequest = (url, method = 'GET', rawBody = null) =>
  new Promise((resolve, reject) => {
    if (!url) {
      reject(new Error('URL parameter required'));
    }

    const options = getOptions({
      method,
      body: rawBody && JSON.stringify(rawBody),
    });

    const isServer = !process.browser;
    // for requests from server we need to avoid proxying
    const prefix = isServer ? BACKEND_URL : '';
    fetch(`${prefix}${url}`, options)
      .then(response => {
        const contentType = response.headers.get('content-type');

        if (!isServer && response.status === 404) {
          Router.pushRoute(ROUTES_NAMES.status, { code: '404', lang: DEFAULT_LOCALE });
        }

        if (contentType && contentType.includes('application/json')) {
          return response.json();
        }

        if (!response.ok) {
          return {
            error: response.statusText,
          };
        }

        return {};
      })
      .then(jsonResponse => {
        if (jsonResponse.error) {
          reject(jsonResponse.error);
        } else {
          resolve(jsonResponse);
        }
      })
      .catch(reject);
  });

export const populateRequest = (ctx, actions) => {
  const { store, res } = ctx;
  cookie = nextCookie(ctx);
  const isServer = !process.browser;

  const promises = castArray(actions).map(action => store.dispatch(action()));

  return Promise.all(promises).catch(err => {
    if (isServer && err === NOT_FOUND) {
      res.writeHead(302, { Location: '/status/404' });
      res.end();
      res.finished = true;
    }
  });
};
