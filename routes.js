const routes = require('next-routes')();

const { VALID_LOCALES } = require('./constants');

const langs = VALID_LOCALES.join('|');

const ENV = require('./utils/env');

const getMarkup = () => {
  if (ENV === 'production') {
    return [];
  }
  return ['example'].map(f => ({ name: `markup/${f}` }));
};

const ROUTES = [
  {
    name: 'main',
    pattern: '',
    page: 'index',
  },
  {
    name: 'createArticle',
    pattern: 'articles/:mode(create)',
    page: 'editArticle',
    params: {
      mode: 'create',
    },
  },
  {
    name: 'about',
  },
  {
    name: 'upload-test',
  },
  {
    name: 'login',
  },
  {
    name: 'article',
    pattern: 'article/:slug',
  },
  {
    name: 'editArticle',
    pattern: 'article/:slug/:mode(edit)',
  },
  {
    name: 'status',
    pattern: 'status/:code(404|500)',
  },
]
  .concat(getMarkup())
  .map(({ name, pattern = name, page = name }) => ({
    name,
    pattern: `/:lang(${langs})/${pattern}`,
    page,
  }));

const ROUTES_NAMES = {};
ROUTES.forEach(route => {
  ROUTES_NAMES[route.name] = route.name;
  routes.add(route);
});

routes.ROUTES_NAMES = ROUTES_NAMES;
module.exports = routes;
