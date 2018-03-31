const API_URL = '/api';
const AUTH_URL = '/auth';

export default {
  auth: {
    login: `${AUTH_URL}/login`,
    register: `${AUTH_URL}/register`,
    logout: `${AUTH_URL}/logout`,
  },
  articles: {
    getAll: `${API_URL}/articles`,
    getBySlug: slug => `${API_URL}/articles/${slug}`,
    getBrands: `${API_URL}/articles/brands`,
    create: `${API_URL}/articles`,
    addLocale: id => `${API_URL}/articles/localize/${id}`,
  },
  users: {
    getAll: `${API_URL}/users`,
    getCurrent: `${API_URL}/users/current`,
  },
  diary: {
    getByDay: (locale, month, day) => `${API_URL}/specials/diary/${locale}/${month}/${day}`,
  },
};
