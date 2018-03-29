import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withRedux from 'next-redux-wrapper';

import PageLayout from 'components/common/PageLayout';
import Button from 'components/common/Button';
import ArticleLink from 'components/articles/ArticleLink';
import ArticlesRow from 'components/articles/grid/ArticlesRow';
import ArticlesComplexRow from 'components/articles/grid/ArticlesComplexRow';

import { ArticlesArray } from 'utils/customPropTypes';

import initStore from 'redux/store';
import { actions as articlesActions, selectors } from 'redux/ducks/articles';
import { actions as auth } from 'redux/ducks/auth';
import request from 'utils/request';
import text from 'constants/dictionary';

const mapStateToProps = state => ({
  articles: selectors.getAll(state),
  error: selectors.isError(state),
});

const FIRST_LINE_END = 4;

class HomePage extends Component {
  static propTypes = {
    articles: ArticlesArray.isRequired,
    error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]).isRequired,
  };

  static getInitialProps(ctx) {
    // TODO: somehow extract getCurrentUser to populate method
    return request.populate(ctx, [auth.getCurrentUser, articlesActions.fetchAll]);
  }

  render() {
    const { articles, error } = this.props;
    return (
      <PageLayout>
        <ArticleLink mode="create">
          <Button>Create Article</Button>
        </ArticleLink>
        <div className="main-page page-container">
          <div className="page-content">
            <ArticlesRow articles={articles.slice(0, FIRST_LINE_END)} />
            <ArticlesComplexRow articles={articles} />
            <div className="load-more" align="center">
              <Button className="button">{text.loadMoreButton}</Button>
            </div>
          </div>
        </div>
        {error && <p>{error}</p>}
      </PageLayout>
    );
  }
}

export default withRedux(initStore, mapStateToProps)(HomePage);
