import React, { Component } from 'react';
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

class ArticlePreview extends Component {
  static propTypes = {
    article: ArticleShape,
    error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
  };

  static defaultProps = {
    article: null,
  };

  static layoutProps = () => ({
    title: 'header.articles',
  });

  static getInitialProps = ctx =>
    populateRequest(ctx, ({ query: { url } }) =>
      adminArticlesActions.fiberyPreview(decodeURIComponent(url))
    );

  render() {
    const { article, error } = this.props;
    if (!article || error) {
      return (
        <div>
          <h1>Error</h1>
          <p>{error}</p>
        </div>
      );
    }
    return <Article data={article} />;
  }
}

ArticlePreview.permissions = ['adminAccess'];

export default connect(mapStateToProps)(ArticlePreview);
