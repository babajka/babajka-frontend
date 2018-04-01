const express = require('express');
const next = require('next');
const proxy = require('http-proxy-middleware');
const cookieParser = require('cookie-parser');

const routes = require('./routes');
const { BACKEND_URL } = require('./constants/server');
const { DEFAULT_LOCALE } = require('./constants');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = routes.getRequestHandler(app);

app.prepare().then(() => {
  const server = express();
  server.use(cookieParser());

  server.use('/auth', proxy({ target: BACKEND_URL, changeOrigin: true }));
  server.use('/api', proxy({ target: BACKEND_URL, changeOrigin: true }));
  // TODO: redirect on preffered lang
  server.get('/', (req, res) => res.redirect(`/${DEFAULT_LOCALE}/articles`));
  server.get('*', (req, res) => handle(req, res));

  server.listen(port, err => {
    if (err) throw err;
    // eslint-disable-next-line no-console
    console.log(`Using Backend on ${BACKEND_URL}`);
    // eslint-disable-next-line no-console
    console.log(`Ready on http://localhost:${port}`);
  });
});
