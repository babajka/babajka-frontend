const BASE_URL = process.env.BABAJKA_BACKEND_URL || 'http://babajka-backend-1.herokuapp.com';
const API_URL = `${BASE_URL}/api`;
const AUTH_URL = `${BASE_URL}/auth`;

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line no-console
  console.log(`Using backend on: ${BASE_URL}`);
}

const api = {
  articles: { getAll: `${API_URL}/articles` },
  auth: {
    login: `${AUTH_URL}/login`,
    register: `${AUTH_URL}/register`,
    logout: `${AUTH_URL}/logout`,
  },
};

export default api;
