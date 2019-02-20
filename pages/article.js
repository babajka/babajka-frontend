import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { MetaTitle, MetaDescription, MetaImage } from 'components/common/Metatags';
import PublicArticle from 'components/articles/PublicArticle';

import { articlesActions, articlesSelectors } from 'redux/ducks/articles';
import { populateRequest } from 'utils/request';
import { ArticleShape, LangType } from 'utils/customPropTypes';

const mapStateToProps = (state, { routerQuery: { slug, articleLocale } }) => ({
  article: articlesSelectors.getCurrent(state, slug),
  articleLocale: articleLocale || articlesSelectors.getLocaleBySlug(state, slug),
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

  static layoutProps = () => ({
    title: 'header.articles',
  });

  static getInitialProps(ctx) {
    const {
      query: { slug },
    } = ctx;
    return populateRequest(ctx, articlesActions.fetchBySlug.bind(null, slug));
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
