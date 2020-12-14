import qs from 'querystring';

const API_URL = '/api';

export default {
  storage: {
    getMainPage: `${API_URL}/storage/main-page`,
    getSidebar: `${API_URL}/storage/sidebar`,
  },
  core: {
    subscribe: `${API_URL}/mail`,
  },
  publicArticle: {
    getBySlug: slug => `${API_URL}/articles/${slug}`,
  },
  articles: {
    getChunk: (pagination = { skip: 0 }) => `${API_URL}/articles?${qs.stringify(pagination)}`,
  },
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
