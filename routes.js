const set = require('lodash/set');
const routes = require('next-routes')();

const { VALID_LOCALES, TOPICS } = require('./constants');

const langs = VALID_LOCALES.join('|');
const topics = TOPICS.join('|');

const ENV = require('./utils/env');

const getMarkup = () => {
  if (ENV === 'production') {
    return [];
  }
  return ['example'].map(f => ({ name: `markup/${f}` }));
};

const ADMIN_ROUTES = [
  {
    name: 'articles',
  },
  {
    name: 'preview',
    pattern: 'preview/:url',
  },
  {
    name: 'login',
  },
].map(({ name, pattern = name, page = name }) => ({
  name: `admin.${name}`,
  pattern: `admin/${pattern}`,
  page: `admin/${page}`,
}));

const ROUTES = [
  {
    name: 'main',
    pattern: '',
    page: 'index',
  },
  {
    name: 'article',
    pattern: 'article/:slug',
  },
  {
    name: 'topic',
    pattern: `topic/:topic(${topics})`,
  },
  {
    name: 'tag',
    pattern: `topic/:topic(${topics})/tag/:tag`,
  },
  {
    name: 'about',
  },
  {
    name: 'diary',
  },
  {
    name: 'status',
    pattern: 'status/:code(404|500)',
  },
]
  .concat(ADMIN_ROUTES)
  .concat(getMarkup())
  .map(({ name, pattern = name, page = name }) => ({
    name,
    pattern: `/:lang(${langs})/${pattern}`,
    page,
  }));

const ROUTES_NAMES = {};
ROUTES.forEach(route => {
  set(ROUTES_NAMES, route.name, route.name);
  routes.add(route);
});

routes.ADMIN_ROUTES = ADMIN_ROUTES;
routes.ROUTES_NAMES = ROUTES_NAMES;
module.exports = routes;
