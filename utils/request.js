import fetch from 'isomorphic-fetch';
import Router from 'next/router';

import { BACKEND_URL, SESSION_COOKIE } from 'constants/server';

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

          if (response.status === 404) {
            if (this.isServer) {
              const { res } = this;
              res.writeHead(302, {
                Location: '/_error',
              });
              res.end();
              res.finished = true;
            } else {
              Router.push({ pathname: '_error' });
            }
          }

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

  populate = ({ store: { dispatch }, isServer, req, res }, actionsToLoad) => {
    this.isServer = isServer;
    this.res = res;
    // TODO: check if we can omit this `if`
    if (isServer) {
      this.cookie = `${SESSION_COOKIE}=${req.cookies[SESSION_COOKIE]}`;
    }
    const actions = actionsToLoad.map(action => action(isServer));
    actions.forEach(action => dispatch(action));
    const promises = actions.map(action => action.payload.catch(e => e));
    // TODO: better error handling
    return Promise.all(promises).catch(err => console.error(err));
  };
}

export default new Request();
