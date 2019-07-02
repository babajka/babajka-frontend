import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { MetaTitle, MetaDescription, MetaImage } from 'components/social/Metatags';

import { articlesActions, articlesSelectors } from 'redux/ducks/articles';
import { populateRequest } from 'utils/request';
import { ArticleShape } from 'utils/customPropTypes';

const mapStateToProps = (state, { routerQuery: { slug } }) => ({
  article: articlesSelectors.getCurrent(state, slug),
});

class ArticlePage extends Component {
  static propTypes = {
    article: ArticleShape,
    routerQuery: PropTypes.shape({
      slug: PropTypes.string.isRequired,
    }).isRequired,
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
    const { article } = this.props;
    const { articleId, slug, title, description } = article;
    return (
      <div>
        <MetaTitle title={article.title} type="article" />
        <MetaDescription description={article.subtitle} />
        <MetaImage url={article.imagePreviewUrl} />
        TODO Article Page:
        <br />
        {title} - {slug} - {articleId}
        <br />
        {description}
      </div>
    );
  }
}

export default connect(mapStateToProps)(ArticlePage);
