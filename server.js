/* eslint-disable no-console */
const express = require('express');
const next = require('next');
const proxy = require('http-proxy-middleware');
const cookieParser = require('cookie-parser');

const routes = require('./routes');
const { BACKEND_URL, MARKUP_URL } = require('./constants/server');
const { DEFAULT_LOCALE } = require('./constants');
const getArgs = require('./utils/args');
const ENV = require('./utils/env');

const ARGS = getArgs();
const port = ARGS.port || 3000;

const dev = ENV !== 'production' && ENV !== 'staging';
const app = next({ dev });

const handle = routes.getRequestHandler(app);

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

  // TODO: redirect on preffered lang
  server.get('/:lang?', (req, res) => {
    const { lang = DEFAULT_LOCALE } = req.params;
    return res.redirect(`/${lang}/articles`);
  });
  server.get('*', (req, res) => handle(req, res));

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Environment is:\t${ENV}`);
    console.log(`> Using Backend on\t${BACKEND_URL}`);
    if (process.env.DEBUG_STYLES === 'true') {
      console.log(`> Using Markup on\t${MARKUP_URL}`);
    }
    console.log(`> Ready on\t\thttp://localhost:${port}`);
    console.log(
      `> To support cookies add '127.0.0.1 local.wir.by' into your hosts file and access on http://local.wir.by:${port}`
    );
  });
});
