const express = require('express');
const next = require('next');
const proxy = require('http-proxy-middleware');

const BACKEND_URL = process.env.BABAJKA_BACKEND_URL || 'http://babajka-backend-1.herokuapp.com';

// const { BACKEND_URL } = require('./constants/api')

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.use('/auth', proxy({ target: BACKEND_URL, changeOrigin: true }));
  // , cookieDomainRewrite: {
  //   "localhost:8080": "localhost:3000",
  //   "127.0.0.1:8080": "127.0.0.1:3000",
  //   "localhost:3000": "localhost:8080"
  // }}))
  server.use('/api/users', proxy({ target: BACKEND_URL, changeOrigin: true }));

  // Redirecting /auth requests to backend.
  // server.get('/auth/*', (req, res) => {
  //   return request
  // })

  server.get('*', (req, res) => handle(req, res));

  server.listen(port, err => {
    if (err) throw err;
    // eslint-disable-next-line no-console
    console.log(`> Ready on http://localhost:${port}`);
  });
});
