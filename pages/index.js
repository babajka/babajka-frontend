import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withRedux from 'next-redux-wrapper';

import PageLayout from 'components/common/layout/PageLayout';
import Button from 'components/common/Button';
import Text from 'components/common/Text';
import Diary from 'components/specials/Diary';
import ArticlesRow from 'components/articles/ArticlesRow';
import ArticlesComplexRow from 'components/articles/ArticlesComplexRow';

import { ArticlesArray } from 'utils/customPropTypes';
import { getMainArticlesRows } from 'utils/getters';

import initStore from 'redux/store';
import { actions as articlesActions, selectors as articlesSelectors } from 'redux/ducks/articles';
import { actions as auth } from 'redux/ducks/auth';
import request from 'utils/request';
import { ROW_SIZE, COMPLEX_ROW_SIZE } from 'constants/articles';

const mapStateToProps = (state, { url: { query } }) => ({
  articles: articlesSelectors.getAll(state, query.lang),
  articlesPending: articlesSelectors.isPending(state),
  nextPage: articlesSelectors.getNextPage(state),
  nextNextPage: articlesSelectors.getNextNextPage(state),
  error: articlesSelectors.isError(state),
});

const mapDispatchToProps = {
  getChunk: articlesActions.fetchChunk,
  mergeCached: articlesActions.mergeCached,
};

class HomePage extends Component {
  static propTypes = {
    url: PropTypes.shape({
      query: PropTypes.object.isRequired,
    }).isRequired,
    articles: ArticlesArray.isRequired,
    articlesPending: PropTypes.bool.isRequired,
    nextPage: PropTypes.number,
    nextNextPage: PropTypes.number,
    getChunk: PropTypes.func.isRequired,
    mergeCached: PropTypes.func.isRequired,
  };

  static defaultProps = {
    nextPage: null,
    nextNextPage: null,
  };

  static getInitialProps(ctx) {
    // TODO: somehow extract getCurrentUser to populate method
    const initialRequests = [auth.getCurrentUser, articlesActions.initialFetch];
    return request.populate(ctx, initialRequests);
  }

  componentDidMount() {
    const { nextPage, getChunk } = this.props;
    if (nextPage) {
      getChunk(nextPage);
    }
  }

  handleLoadMore = () => {
    const { nextNextPage, getChunk, mergeCached } = this.props;
    mergeCached();
    if (nextNextPage) {
      getChunk(nextNextPage);
    }
  };

  render() {
    const { articles, articlesPending, nextPage, url } = this.props;

    const { query: { lang } } = url;

    const articlesRows = getMainArticlesRows(articles, ROW_SIZE, COMPLEX_ROW_SIZE);
    const [firstRow, secondRow, ...remainRows] = articlesRows;

    return (
      <PageLayout url={url} title="header.home">
        <div className="main-page page-container">
          {firstRow && <ArticlesRow articles={firstRow} className="first-line is-ancestor" />}
          {secondRow && (
            <ArticlesComplexRow articles={secondRow} renderDiary={() => <Diary lang={lang} />} />
          )}
          {remainRows.map(data => (
            <ArticlesRow key={data[0]._id} articles={data} className="first-line is-ancestor" />
          ))}
          {nextPage && (
            <div className="load-more" align="center">
              <Button className="button" pending={articlesPending} onClick={this.handleLoadMore}>
                <Text id="home.loadMore" />
              </Button>
            </div>
          )}
        </div>
      </PageLayout>
    );
  }
}

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(HomePage);
