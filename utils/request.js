import { BACKEND_URL } from 'constants/server';

export class RequestError extends Error {
  constructor(response) {
    super(response.statusText);
    this.name = 'RequestError';
    this.statusCode = response.status;
    Error.captureStackTrace(this, RequestError);
  }
}

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

  if (!response.ok) {
    throw new RequestError(response);
  }

  if (contentType?.includes('application/json')) {
    return response.json();
  }

  return response.text();
};

// WARNING: shouldn't be used with `getStaticProps`
export const catchServerSideErrors = handler => ctx =>
  handler(ctx).catch(err => {
    if (err.statusCode === 404) {
      return { notFound: true };
    }
    return {
      redirect: {
        destination: '/status/500',
      },
    };
  });
