import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withRedux from 'next-redux-wrapper';

import CoreLayout from 'components/common/CoreLayout';
import ArticlesRow from 'components/articles/grid/ArticlesRow';
import ArticlesComplexRow from 'components/articles/grid/ArticlesComplexRow';
import articlePropTypes from 'utils/customPropTypes';
import initStore from 'redux/store';
import { actions as articlesActions, selectors } from 'redux/ducks/articles';
import { actions as auth } from 'redux/ducks/auth';
import request from 'utils/request';

const mapStateToProps = state => ({
  articles: selectors.getAll(state),
  error: selectors.isError(state),
});

class HomePage extends Component {
  static propTypes = {
    articles: PropTypes.arrayOf(PropTypes.shape(articlePropTypes)).isRequired,
    error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]).isRequired,
  };

  static getInitialProps(ctx) {
    // TODO: somehow extract getCurrentUser to populate method
    return request.populate(ctx, [auth.getCurrentUser, articlesActions.fetchAll]);
  }

  render() {
    const { articles, error } = this.props;
    return (
      <CoreLayout>
        <div className="main-page page-container">
          <div className="page-content">
            <ArticlesRow articles={articles.slice(0, 4)} />
            <ArticlesComplexRow articles={articles} />
          </div>
        </div>
        {error && <p>{error}</p>}
      </CoreLayout>
    );
  }
}

export default withRedux(initStore, mapStateToProps)(HomePage);
