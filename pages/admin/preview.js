import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Article from 'components/articles/Article';

import { adminArticlesActions, adminArticlesSelectors } from 'redux/ducks/admin/articles';
import { populateRequest } from 'utils/request';
import { ArticleShape } from 'utils/customPropTypes';

const mapStateToProps = (state, { lang }) => ({
  article: adminArticlesSelectors.getPreview(state, lang),
  error: adminArticlesSelectors.getError(state),
});

const ArticlePreview = ({ article, error }) => {
  if (!article || error) {
    return (
      <div>
        <h1>Error</h1>
        <p>{error}</p>
      </div>
    );
  }
  return <Article data={article} />;
};

ArticlePreview.getInitialProps = ctx =>
  populateRequest(ctx, ({ query: { url } }) =>
    adminArticlesActions.fiberyPreview(decodeURIComponent(url))
  );

ArticlePreview.propTypes = {
  article: ArticleShape,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
};

ArticlePreview.defaultProps = {
  article: null,
};

ArticlePreview.layoutProps = () => ({
  title: 'header.articles',
});

ArticlePreview.permissions = ['adminAccess'];

export default connect(mapStateToProps)(ArticlePreview);
