const set = require('lodash/set');
const routes = require('next-routes')();

const { VALID_LOCALES, TOPICS, NY2021 } = require('./constants');

const langs = VALID_LOCALES.join('|');
const topics = TOPICS.join('|');

const ROUTES = [
  {
    name: 'main',
    pattern: '',
    page: 'index',
  },
  {
    name: 'article',
    pattern: '/article/:slug',
  },
  {
    name: 'topic',
    pattern: `/topic/:topic(${topics})`,
  },
  {
    name: 'tag',
    pattern: `/topic/:topic(${topics})/tag/:tag`,
  },
  {
    name: 'collection',
    pattern: '/collection/:slug',
  },
  {
    name: 'about',
  },
  {
    name: 'diary',
    pattern: '/diary/:slug?',
  },
  {
    name: 'status',
    pattern: '/status/:code(404|500)',
  },
  {
    name: `game/${NY2021}`,
  },
].map(({ name, pattern = `/${name}`, page = name }) => ({
  name,
  pattern: `/:lang(${langs})${pattern}`,
  page,
}));

const ROUTES_NAMES = {};
ROUTES.forEach(route => {
  set(ROUTES_NAMES, route.name, route.name);
  routes.add(route);
});

routes.ROUTES_NAMES = ROUTES_NAMES;
module.exports = routes;
