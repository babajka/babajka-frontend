import qs from 'qs';

const API_URL = '/api';
const AUTH_URL = '/auth';

const queryOptions = { addQueryPrefix: true };

export default {
  auth: {
    login: `${AUTH_URL}/login`,
    register: `${AUTH_URL}/register`,
    logout: `${AUTH_URL}/logout`,
  },
  storage: {
    getMainPage: `${API_URL}/storage/main-page`,
    getSidebar: `${API_URL}/storage/sidebar`,
  },
  core: {
    uploads: `${API_URL}/core/uploads`,
    subscribe: `${API_URL}/mail`,
  },
  articles: {
    getChunk: pagination => `${API_URL}/articles${qs.stringify(pagination, queryOptions)}`,
    getBySlug: slug => `${API_URL}/articles/${slug}`,
    getBrands: `${API_URL}/articles/brands`,
    getAuthors: `${API_URL}/articles/authors`,
    getColletions: `${API_URL}/articles/collections`,
    create: `${API_URL}/articles`,
    update: id => `${API_URL}/articles/${id}`,
    remove: id => `${API_URL}/articles/${id}`,
    addLocale: id => `${API_URL}/articles/localize/${id}`,
  },
  users: {
    getAll: `${API_URL}/users`,
    getCurrent: `${API_URL}/users/current`,
  },
  diary: {
    getByDay: (locale, month, day) => `${API_URL}/specials/diary/${locale}/${month}/${day}`,
  },
  topics: {
    getArticles: topic => `${API_URL}/topics/articles/${topic}`,
  },
};
