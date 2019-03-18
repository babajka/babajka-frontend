/* eslint-disable no-console */
const express = require('express');
const next = require('next');
const proxy = require('http-proxy-middleware');
const cookieParser = require('cookie-parser');

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

const isValidLocaleCookie = req => VALID_LOCALES.includes(req.cookies[LOCALE_COOKIE_NAME]);
const getUserLocale = req =>
  isValidLocaleCookie(req) ? req.cookies[LOCALE_COOKIE_NAME] : DEFAULT_LOCALE;

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

  server.get('/', (req, res) => res.redirect(`/${getUserLocale(req)}/`));

  server.get('/:startPath*', (req, res) => {
    const { startPath } = req.params;
    const userLocale = getUserLocale(req);

    if (STATIC_PATHS.includes(startPath)) {
      return handle(req, res);
    }

    if (!VALID_LOCALES.includes(startPath)) {
      // missed locale, add user locale & redirect
      return res.redirect(`/${userLocale}${req.originalUrl}`);
    }

    if (userLocale === startPath || !isValidLocaleCookie(req)) {
      return handle(req, res);
    }

    // cookies contain valid locale and it differs from the one in the request,
    // replace locale & redirect
    return res.redirect(`/${userLocale}${req.params[0]}`);
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
