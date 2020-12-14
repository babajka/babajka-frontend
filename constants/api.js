import qs from 'qs';

const API_URL = '/api';
// const AUTH_URL = '/auth';

const queryOptions = { addQueryPrefix: true };

export default {
  // auth: {
  //   login: `${AUTH_URL}/login`,
  //   register: `${AUTH_URL}/register`,
  //   logout: `${AUTH_URL}/logout`,
  // },
  storage: {
    getMainPage: `${API_URL}/storage/main-page`,
    getSidebar: `${API_URL}/storage/sidebar`,
  },
  core: {
    // uploads: `${API_URL}/core/uploads`,
    subscribe: `${API_URL}/mail`,
  },
  publicArticle: {
    getBySlug: slug => `${API_URL}/articles/${slug}`,
  },
  articles: {
    getChunk: (pagination = { skip: 0 }) =>
      `${API_URL}/articles${qs.stringify(pagination, queryOptions)}`,
    // fiberyPreview: `${API_URL}/articles/fibery/preview`,
    // fiberyImport: `${API_URL}/articles/fibery/import`,
  },
  // users: {
  //   getCurrent: `${API_URL}/users/current`,
  // },
  diary: {
    getByDay: (month, day) => `${API_URL}/specials/diary/get/${month}/${day}`,
    getBySlug: slug => `${API_URL}/specials/diary/getBySlug/${slug}`,
    today: `${API_URL}/specials/diary/today`,
  },
  topics: {
    getArticles: topic => `${API_URL}/topics/articles/${topic}`,
  },
  tags: {
    getArticles: tag => `${API_URL}/tags/articles/${tag}`,
  },
  collections: {
    getOne: slug => `${API_URL}/collections/${slug}`,
  },
};
