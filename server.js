const express = require('express');
const next = require('next');
const proxy = require('http-proxy-middleware');
const cookieParser = require('cookie-parser');

const { BACKEND_URL } = require('./constants/server');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  server.use(cookieParser());

  server.use('/auth', proxy({ target: BACKEND_URL, changeOrigin: true }));
  server.use('/api', proxy({ target: BACKEND_URL, changeOrigin: true }));
  server.get('/articles/create', (req, res) =>
    app.render(req, res, '/article', { ...req.query, slug: null, mode: 'create' })
  );
  server.get('/article/:slug/:mode?', (req, res) => {
    const { slug, mode = 'public' } = req.params;
    if (!slug || !['public', 'edit'].includes(mode)) {
      res.writeHead(302, {
        Location: '/_error',
      });
      res.end();
      res.finished = true;
    }
    app.render(req, res, '/article', { ...req.query, slug, mode });
  });
  server.get('*', (req, res) => handle(req, res));

  server.listen(port, err => {
    if (err) throw err;
    // eslint-disable-next-line no-console
    console.log(`Using Backend on ${BACKEND_URL}`);
    // eslint-disable-next-line no-console
    console.log(`Ready on http://localhost:${port}`);
  });
});
