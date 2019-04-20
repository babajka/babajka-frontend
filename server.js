/* eslint-disable no-console */
const express = require('express');
const next = require('next');
const proxy = require('http-proxy-middleware');
const cookieParser = require('cookie-parser');
const qs = require('querystring');

const routes = require('./routes');
const { BACKEND_URL, LOCALE_COOKIE_NAME } = require('./constants/server');
const { DEFAULT_LOCALE, STATIC_PATHS, VALID_LOCALES } = require('./constants');
const getArgs = require('./utils/args');
const ENV = require('./utils/env');

const ARGS = getArgs();
const port = ARGS.port || 3000;

const dev = ENV !== 'production' && ENV !== 'staging';
const app = next({ dev });

const handle = routes.getRequestHandler(app);

const getUserLocale = req => {
  const lang = req.cookies[LOCALE_COOKIE_NAME];
  return VALID_LOCALES.includes(lang) && lang;
};

const getValidLocale = loc => loc || DEFAULT_LOCALE;

process.on('uncaughtException', err => {
  console.error('Uncaught Exception: ', err);
});

process.on('unhandledRejection', (reason, p) => {
  console.error('Unhandled Rejection: Promise:', p, 'Reason:', reason);
});

app.prepare().then(() => {
  const server = express();
  server.use(cookieParser());

  server.use('/auth', proxy({ target: BACKEND_URL, changeOrigin: true }));
  server.use('/api', proxy({ target: BACKEND_URL, changeOrigin: true }));
  // test redirection is to access data located in public/test backend path.
  // This is useful for fully local development.
  server.use('/test', proxy({ target: BACKEND_URL, changeOrigin: true }));

  server.get('/', (req, res) => res.redirect(`/${getValidLocale(getUserLocale(req))}${req.url}`));

  server.get('/:startPath*', (req, res) => {
    const { startPath } = req.params;

    if (STATIC_PATHS.includes(startPath)) {
      return handle(req, res);
    }

    const userLocale = getUserLocale(req);
    if (!VALID_LOCALES.includes(startPath)) {
      // missed locale, add it & redirect
      return res.redirect(`/${getValidLocale(userLocale)}${req.originalUrl}`);
    }

    if (userLocale && startPath !== userLocale) {
      // switch locale to user preferable
      return res.redirect(`/${userLocale}${req.params[0]}`);
    }

    // fix http://local.wir.by:3000/en?kek=lol - 404
    if (!req.path.endsWith('/')) {
      let url = `${req.path}/`;
      const query = qs.stringify(req.query);
      if (query) {
        url = `${url}?${query}`;
      }
      return res.redirect(url);
    }

    return handle(req, res);
  });

  server.listen(port, err => {
    if (err) {
      throw err;
    }
    console.log(`> Environment is:\t${ENV}`);
    console.log(`> Using Backend on\t${BACKEND_URL}`);
    console.log(`> Ready on\t\thttp://localhost:${port}`);
    console.log(
      `> To support cookies add '127.0.0.1 local.wir.by' into your hosts file and access on http://local.wir.by:${port}`
    );
  });
});
