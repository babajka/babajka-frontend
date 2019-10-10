import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { localize } from 'components/common/Text';
import Article from 'components/articles/Article';
import HeaderLinks from 'components/common/layout/HeaderLinks';

import { ROUTES_NAMES } from 'routes';

import { publicArticleActions, publicArticleSelectors } from 'redux/ducks/publicArticle';
import { populateRequest } from 'utils/request';
import { ArticleShape } from 'utils/customPropTypes';

const mapStateToProps = (state, { routerQuery: { slug } }) => ({
  article: publicArticleSelectors.getCurrent(state, slug),
  otherLocales: publicArticleSelectors.getOtherLocales(state, slug),
});

const ArticlePage = ({ article, otherLocales }) => (
  <>
    <HeaderLinks
      key={article.locale}
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

ArticlePage.propTypes = {
  article: ArticleShape,
  otherLocales: PropTypes.arrayOf(
    PropTypes.shape({
      slug: PropTypes.string.isRequired,
    })
  ).isRequired,
  routerQuery: PropTypes.shape({
    slug: PropTypes.string.isRequired,
  }).isRequired,
};

ArticlePage.defaultProps = {
  article: null,
};

ArticlePage.layoutProps = () => ({
  title: 'header.articles',
});

ArticlePage.getInitialProps = ctx =>
  populateRequest(ctx, ({ query: { slug } }) => publicArticleActions.fetchBySlug(slug));

export default connect(mapStateToProps)(ArticlePage);
