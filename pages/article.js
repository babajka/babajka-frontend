import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withRedux from 'next-redux-wrapper';

import PageLayout from 'components/common/layout/PageLayout';
import PublicArticle from 'components/articles/PublicArticle';

import initStore from 'redux/store';
import { actions as articlesActions, selectors } from 'redux/ducks/articles';
import { actions as auth, selectors as authSelectors } from 'redux/ducks/auth';
import request from 'utils/request';
import { ArticleShape, LangType } from 'utils/customPropTypes';

const mapStateToProps = (state, { url: { query } }) => ({
  article: selectors.getCurrent(state, query.slug),
  articleLocale: query.articleLocale || selectors.getLocaleBySlug(state, query.slug),
  error: selectors.isError(state),
  permissions: authSelectors.getPermissions(state),
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
    const { article, url, articleLocale } = this.props;
    return (
      <PageLayout className="article-content" url={url} title="header.home">
        <PublicArticle {...article} articleLocale={articleLocale} />
      </PageLayout>
    );
  }
}

ArticlePage.propTypes = {
  article: ArticleShape,
  articleLocale: LangType,
  url: PropTypes.shape({}).isRequired,
};

ArticlePage.defaultProps = {
  article: null,
  articleLocale: null,
};

export default withRedux(initStore, mapStateToProps)(ArticlePage);
