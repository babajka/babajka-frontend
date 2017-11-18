export const DEFAULT_OPTIONS = {
  mode: 'cors',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

export default (url, method = 'GET', rawBody = null) => (
  new Promise((resolve, reject) => {
    if (!url) {
      reject(new Error('URL parameter required'));
    }

    const options = { ...DEFAULT_OPTIONS, method };
    if (rawBody) {
      options.body = JSON.stringify(rawBody);
    }

    fetch(url, options)
      .then(response => response.json())
      .then((response) => {
        if (response.error) {
          reject(response.error);
        } else {
          resolve(response);
        }
      })
      .catch(reject);
  })
);
