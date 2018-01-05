import { BACKEND_URL } from './server';

const buildApi = baseUrl => {
  const API_URL = `${baseUrl}/api`;
  const AUTH_URL = `${baseUrl}/auth`;
  return {
    auth: {
      login: `${AUTH_URL}/login`,
      register: `${AUTH_URL}/register`,
      logout: `${AUTH_URL}/logout`,
    },
    articles: { getAll: `${API_URL}/articles` },
    users: {
      getAll: `${API_URL}/users`,
      getCurrent: `${API_URL}/users/current`,
    },
  };
};

const forServer = buildApi(BACKEND_URL);
const forClient = buildApi('');

export default isServer => (isServer ? forServer : forClient);
