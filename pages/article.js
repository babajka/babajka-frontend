import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withRedux from 'next-redux-wrapper';

import PageLayout from 'components/common/layout/PageLayout';
import PublicArticle from 'components/articles/PublicArticle';
import EditArticleForm from 'components/articles/edit/EditArticleForm';

import initStore from 'redux/store';
import { actions as articlesActions, selectors } from 'redux/ducks/articles';
import { actions as auth } from 'redux/ducks/auth';
import request from 'utils/request';
import { ArticleShape, LangType } from 'utils/customPropTypes';

const mapStateToProps = (state, { url: { query } }) => ({
  article: selectors.getCurrent(state, query.slug),
  articleLocale: query.articleLocale || selectors.getLocaleBySlug(state, query.slug),
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
    const { article, url, articleLocale } = this.props;
    const { query: { mode } } = url;
    if (!mode) {
      return (
        <PageLayout url={url}>
          <PublicArticle {...article} articleLocale={articleLocale} />
        </PageLayout>
      );
    }

    return (
      <PageLayout url={url}>
        <EditArticleForm lang={url.query.lang} articleLocale={articleLocale} mode={mode} />
      </PageLayout>
    );
  }
}

ArticlePage.propTypes = {
  article: ArticleShape,
  articleLocale: LangType,
  url: PropTypes.shape({
    query: PropTypes.shape({
      mode: PropTypes.oneOf(['public', 'create', 'edit']),
    }).isRequired,
  }).isRequired,
};

ArticlePage.defaultProps = {
  article: null,
  articleLocale: null,
};

export default withRedux(initStore, mapStateToProps)(ArticlePage);
