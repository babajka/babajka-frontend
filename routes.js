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
    name: 'status',
    pattern: 'status/:code(404|500)',
  },
  // legacy pages, to refactor:
  // {
  //   name: 'createArticle',
  //   pattern: 'articles/:mode(create)',
  //   page: 'editArticle',
  //   params: {
  //     mode: 'create',
  //   },
  // },
  // {
  //   name: 'upload-test',
  // },
  // {
  //   name: 'login',
  // },
  // {
  //   name: 'editArticle',
  //   pattern: 'article/:slug/:mode(edit)',
  // },
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
