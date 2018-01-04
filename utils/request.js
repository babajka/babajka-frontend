export const DEFAULT_OPTIONS = {
  mode: 'cors',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  credentials: 'same-origin',
};

export default (url, method = 'GET', rawBody = null) =>
  new Promise((resolve, reject) => {
    if (!url) {
      reject(new Error('URL parameter required'));
    }

    const options = { ...DEFAULT_OPTIONS, method };
    if (rawBody) {
      options.body = JSON.stringify(rawBody);
    }

    fetch(url, options)
      .then(response => {
        if (!response.ok) {
          return {
            error: response.statusText,
          };
        }
        return response.json();
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
