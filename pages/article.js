import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { MetaTitle, MetaDescription, MetaImage } from 'components/common/Metatags';
import PublicArticle from 'components/articles/PublicArticle';

import { actions as articlesActions, selectors } from 'redux/ducks/articles';
import { actions as auth, selectors as authSelectors } from 'redux/ducks/auth';
import request from 'utils/request';
import { ArticleShape, LangType } from 'utils/customPropTypes';

const mapStateToProps = (state, { routerQuery: { slug, articleLocale } }) => ({
  article: selectors.getCurrent(state, slug),
  articleLocale: articleLocale || selectors.getLocaleBySlug(state, slug),
  error: selectors.isError(state),
  permissions: authSelectors.getPermissions(state),
});

class ArticlePage extends Component {
  static propTypes = {
    article: ArticleShape,
    articleLocale: LangType.isRequired,
    routerQuery: PropTypes.shape({
      slug: PropTypes.string.isRequired,
      articleLocale: PropTypes.string,
    }).isRequired,
    lang: LangType.isRequired,
  };

  static defaultProps = {
    article: null,
  };

  static layoutProps = {
    title: 'header.articles',
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
    const { article, articleLocale, lang } = this.props;
    return (
      <div className="article-content">
        <MetaTitle title={article.title} type="article" />
        <MetaDescription description={article.subtitle} />
        <MetaImage url={article.imagePreviewUrl} />
        <PublicArticle {...article} articleLocale={articleLocale} lang={lang} />
      </div>
    );
  }
}

export default connect(mapStateToProps)(ArticlePage);
