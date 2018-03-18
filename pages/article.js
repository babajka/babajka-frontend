import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withRedux from 'next-redux-wrapper';

import EditArticleForm from 'components/articles/EditArticleForm';
import PublicArticle from 'components/articles/PublicArticle';

import initStore from 'redux/store';
import { actions as articlesActions, selectors } from 'redux/ducks/articles';
import { actions as auth } from 'redux/ducks/auth';
import request from 'utils/request';
import { getLocalizedArticle } from 'utils/getters';
import { ArticleModel } from 'utils/customPropTypes';

const mapStateToProps = state => ({
  article: selectors.getCurrent(state),
  error: selectors.isError(state),
});

class ArticlePage extends Component {
  static getInitialProps(ctx) {
    const { query: { slug } } = ctx;
    return request.populate(
      ctx,
      [auth.getCurrentUser, slug && articlesActions.fetchBySlug.bind(null, slug)].filter(Boolean)
    );
  }

  render() {
    const { article, url: { query: { mode } } } = this.props;
    if (mode === 'public') {
      const localized = getLocalizedArticle(article);
      return <PublicArticle {...localized} />;
    }
    return <EditArticleForm mode={mode} />;
  }
}

ArticlePage.propTypes = {
  article: ArticleModel,
  url: PropTypes.shape({
    query: PropTypes.shape({
      mode: PropTypes.oneOf(['public', 'create', 'edit']),
    }).isRequired,
  }).isRequired,
};

ArticlePage.defaultProps = {
  article: null,
};

export default withRedux(initStore, mapStateToProps)(ArticlePage);
