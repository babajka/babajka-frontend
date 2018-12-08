import React, { Component } from 'react';
import { withRouter } from 'next/router';
import PropTypes from 'prop-types';
import withRedux from 'next-redux-wrapper';

import PageLayout from 'components/common/layout/PageLayout';
import { MetaTitle, MetaDescription, MetaImage } from 'components/common/layout/Metatags';
import PublicArticle from 'components/articles/PublicArticle';

import initStore from 'redux/store';
import { actions as articlesActions, selectors } from 'redux/ducks/articles';
import { actions as auth, selectors as authSelectors } from 'redux/ducks/auth';
import request from 'utils/request';
import { ArticleShape, LangType } from 'utils/customPropTypes';

const mapStateToProps = (state, { router: { query } }) => ({
  article: selectors.getCurrent(state, query.slug),
  articleLocale: query.articleLocale || selectors.getLocaleBySlug(state, query.slug),
  error: selectors.isError(state),
  permissions: authSelectors.getPermissions(state),
});

class ArticlePage extends Component {
  static propTypes = {
    article: ArticleShape,
    articleLocale: LangType,
    router: PropTypes.shape().isRequired,
  };

  static defaultProps = {
    article: null,
    articleLocale: null,
  };

  static getInitialProps(ctx) {
    const {
      query: { slug },
    } = ctx;
    return request.populate(
      ctx,
      [auth.getCurrentUser, slug && articlesActions.fetchBySlug.bind(null, slug)].filter(Boolean)
    );
  }

  render() {
    const { article, router, articleLocale } = this.props;
    return (
      <PageLayout className="article-content" router={router} title="header.home">
        <MetaTitle title={article.title} type="article" />
        <MetaDescription description={article.subtitle} />
        <MetaImage url={article.imagePreviewUrl} />
        <PublicArticle {...article} articleLocale={articleLocale} />
      </PageLayout>
    );
  }
}

export default withRouter(withRedux(initStore, mapStateToProps)(ArticlePage));
