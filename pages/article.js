import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Article from 'components/articles/Article';

import { publicArticleActions, publicArticleSelectors } from 'redux/ducks/publicArticle';
import { populateRequest } from 'utils/request';
import { ArticleShape } from 'utils/customPropTypes';

const mapStateToProps = (state, { routerQuery: { slug } }) => ({
  article: publicArticleSelectors.getCurrent(state, slug),
});

const ArticlePage = ({ article }) => <Article data={article} />;

ArticlePage.propTypes = {
  article: ArticleShape,
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
