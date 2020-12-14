import { Router, ROUTES_NAMES } from 'routes';
import { BACKEND_URL } from 'constants/server';
import { DEFAULT_LOCALE } from 'constants';

const DEFAULT_OPTIONS = {
  mode: 'cors',
  credentials: 'same-origin',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

export const makeRequest = (url, method = 'GET', rawBody = null) =>
  new Promise((resolve, reject) => {
    if (!url) {
      reject(new Error('URL parameter required'));
    }

    const options = {
      ...DEFAULT_OPTIONS,
      method,
      body: rawBody && JSON.stringify(rawBody),
    };

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
