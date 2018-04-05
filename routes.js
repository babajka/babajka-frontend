const routes = require('next-routes')();

const { LOCALES } = require('./constants');

const langs = Object.keys(LOCALES).join('|');

const isActive = (path, name) => path.split('/').slice(-1)[0] === name;

const NAVBAR_ROUTES = [
  {
    name: 'home',
    label: 'Артыкулы',
    pattern: 'articles',
    page: 'index',
    isActive,
  },
  {
    name: 'collections',
    label: 'Калекцыі',
    isActive,
  },
  {
    name: 'partners',
    label: 'Партнёры',
    isActive,
  },
  {
    name: 'create-article',
    label: 'Стварыць Артыкул',
    pattern: 'articles/:mode(create)',
    page: 'article',
    params: {
      mode: 'create',
    },
    isActive: path => {
      const [_, __, route, mode] = path.split('/');
      return route === 'articles' && mode === 'create';
    },
  },
  {
    name: 'about',
    label: 'Пра Нас',
    isActive,
  },
];

const ROUTES = [
  ...NAVBAR_ROUTES,
  {
    name: 'login',
  },
  {
    name: 'article',
    pattern: 'article/:slug/:mode(edit)?',
  },
].map(({ name, pattern = name, page = name, label = name }) => ({
  name,
  pattern: `/:lang(${langs})/${pattern}`,
  page,
  label,
}));

const ROUTES_NAMES = {};
ROUTES.forEach(route => {
  ROUTES_NAMES[route.name] = route.name;
  routes.add(route);
});

routes.NAVBAR_ROUTES = NAVBAR_ROUTES;
routes.ROUTES_NAMES = ROUTES_NAMES;
module.exports = routes;
