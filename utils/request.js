import fetch from 'isomorphic-fetch';

import { SESSION_COOKIE, BACKEND_URL } from 'constants/server';

export const DEFAULT_OPTIONS = {
  mode: 'cors',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  credentials: 'same-origin',
};

class Request {
  fetch = (url, method = 'GET', rawBody = null) =>
    new Promise((resolve, reject) => {
      if (!url) {
        reject(new Error('URL parameter required'));
      }

      const options = { ...DEFAULT_OPTIONS, method };
      options.headers.Cookie = this.cookie;
      if (rawBody) {
        options.body = JSON.stringify(rawBody);
      }

      // for requests from server we need to avoid proxying
      const prefix = this.isServer ? BACKEND_URL : '';
      fetch(`${prefix}${url}`, options)
        .then(response => {
          const contentType = response.headers.get('content-type');

          if (contentType.includes('application/json')) {
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

  populate = ({ store: { dispatch }, isServer, req }, actionsToLoad) => {
    // TODO: check if we can omit this `if`
    this.isServer = isServer;
    if (isServer) {
      this.cookie = `${SESSION_COOKIE}=${req.cookies[SESSION_COOKIE]}`;
    }
    const actions = actionsToLoad.map(action => action(isServer));
    actions.forEach(action => dispatch(action));
    return Promise.all(actions.map(action => action.payload));
  };
}

export default new Request();
