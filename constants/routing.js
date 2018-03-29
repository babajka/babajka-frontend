import Router from 'next/router';
import qs from 'qs';

export const ARTICLE_ROUTE = '/article';

export const ARTICLE_BY_MODE = {
  public: slug => `${ARTICLE_ROUTE}/${slug}`,
  edit: slug => `${ARTICLE_ROUTE}/${slug}/edit`,
  create: () => `/articles/create`,
};

// FIXME
export const getArticleUrl = (slug, mode) => `${ARTICLE_ROUTE}?${qs.stringify({ slug, mode })}`;

export const redirectToArticle = (slug, mode) =>
  Router.push(
    {
      pathname: ARTICLE_ROUTE,
      query: { slug, mode },
    },
    `${window.location.origin}${ARTICLE_BY_MODE.edit(slug)}`
  );

export default {
  home: '/',
  login: '/login',
  about: '/about',
  partners: '/partners',
  collections: '/collections',
  articles: {
    create: ARTICLE_BY_MODE.create(),
  },
};
