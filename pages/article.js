import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withRedux from 'next-redux-wrapper';
import renderHTML from 'react-render-html';

import initStore from 'redux/store';
import { actions as articlesActions, selectors } from 'redux/ducks/articles';
import { actions as auth } from 'redux/ducks/auth';
import request from 'utils/request';

const mapStateToProps = state => ({
  article: selectors.getCurrent(state),
  error: selectors.isError(state),
});

class ArticlePage extends Component {
  static getInitialProps(ctx) {
    const { query: { slug } } = ctx;
    return request.populate(ctx, [
      auth.getCurrentUser,
      articlesActions.fetchBySlug.bind(null, slug),
    ]);
  }

  render() {
    const { article } = this.props;
    if (!article) {
      return 'pending';
    }
    const locale = 'ru';
    const localized = article.locales[locale];
    return <div>{renderHTML(localized.text)}</div>;
  }
}

ArticlePage.propTypes = {
  // TODO: add article model
  article: PropTypes.shape({}).isRequired,
};

export default withRedux(initStore, mapStateToProps)(ArticlePage);
