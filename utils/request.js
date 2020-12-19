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

export const makeRequest = async (url, method = 'GET', rawBody = null) => {
  const options = {
    ...DEFAULT_OPTIONS,
    method,
    body: rawBody && JSON.stringify(rawBody),
  };

  const isServer = !process.browser;
  // for requests from server we need to avoid proxying
  const prefix = isServer ? BACKEND_URL : '';
  const response = await fetch(`${prefix}${url}`, options);
  const contentType = response.headers.get('content-type');

  if (!isServer && response.status === 404) {
    Router.pushRoute(ROUTES_NAMES.status, { code: '404', lang: DEFAULT_LOCALE });
  }

  if (contentType?.includes('application/json')) {
    return response.json();
  }

  if (!response.ok) {
    return {
      error: response.statusText,
    };
  }

  return response;
};
