import React from 'react';

import { localize } from 'components/common/Text';
import Article from 'components/articles/Article';
import HeaderLinks from 'components/common/layout/header/HeaderLinks';

import { ROUTES_NAMES } from 'routes';
import api from 'constants/api';

import { getLocalizedArticle, getLocalesBySlug } from 'utils/getters';
import { makeRequest } from 'utils/request';

const ArticlePage = ({ article, otherLocales }) => (
  <>
    <HeaderLinks
      links={otherLocales.map(({ locale, slug }) => ({
        key: locale,
        route: ROUTES_NAMES.article,
        params: { slug },
        title: localize('article.read-in', locale),
      }))}
    />
    <Article data={article} />
  </>
);

ArticlePage.layoutProps = () => ({
  title: 'header.articles',
});

// TODO: replace with SSG after migration from `next-routes`
export const getServerSideProps = async ({ query: { slug } }) => {
  const article = await makeRequest(api.publicArticle.getBySlug(slug));
  const { locales } = article;
  const localesBySlug = getLocalesBySlug({ locales });
  const currentLocale = localesBySlug[slug];

  return {
    props: {
      article: getLocalizedArticle(article, currentLocale),
      otherLocales: Object.values(locales).filter(({ locale }) => locale !== currentLocale),
    },
  };
};

export default ArticlePage;
