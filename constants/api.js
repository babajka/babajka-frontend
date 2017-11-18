const BASE_URL = 'http://localhost:8080';
const API_URL = `${BASE_URL}/api`;
const AUTH_URL = `${BASE_URL}/auth`;

const api = {
  articles: {
    getAll: `${API_URL}/articles`,
  },
  auth: {
    login: `${AUTH_URL}/login`,
    register: `${AUTH_URL}/register`,
    logout: `${AUTH_URL}/logout`,
  },
};

export default api;
