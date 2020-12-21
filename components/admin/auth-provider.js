import { makeRequest } from 'utils/request';

import api from 'constants/api';

const LS_KEY = 'user';
const LOGOUT_ERROR_CODES = [401, 403];

// TODO: check cookie or setup jwt token

const getUser = async () => {
  const user = JSON.parse(localStorage.getItem(LS_KEY));
  const isValid = user?.token && user?.permissions?.adminAccess;
  if (!isValid) {
    throw new Error();
  }
  return user;
};

const logout = () => localStorage.removeItem(LS_KEY);

const authProvider = {
  // authentication
  login: ({ username: email, password }) => {
    return makeRequest(api.auth.login, 'POST', { email, password }).then(({ user }) => {
      localStorage.setItem(LS_KEY, JSON.stringify(user));
    });
  },
  checkError: ({ status }) => {
    if (LOGOUT_ERROR_CODES.includes(status)) {
      logout();
      // eslint-disable-next-line prefer-promise-reject-errors
      return Promise.reject({ message: false });
    }
    // other error code (404, 500, etc): no need to log out
    return Promise.resolve();
  },
  checkAuth: getUser,
  logout: () => {
    logout();
    return Promise.resolve();
  },
  //   FIXME: id
  getIdentity: async () => {
    try {
      const { displayName: fullName, token: id } = await getUser();
      return { id, fullName };
    } catch (error) {
      return Promise.reject(error);
    }
  },
  // authorization
  getPermissions: () => getUser().then(u => u.permissions),
};

export default authProvider;
