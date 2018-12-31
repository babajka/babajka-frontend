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
  total: articlesSelectors.getTotal(state),
  cachedLength: articlesSelectors.getCachedArticlesLength(state),
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
    getChunk: PropTypes.func.isRequired,
    mergeCached: PropTypes.func.isRequired,
    total: PropTypes.number.isRequired,
    cachedLength: PropTypes.number.isRequired,
  };

  static getInitialProps(ctx) {
    // TODO: somehow extract getCurrentUser to populate method
    const initialRequests = [auth.getCurrentUser, articlesActions.initialFetch];
    return request.populate(ctx, initialRequests);
  }

  componentDidMount() {
    const { getChunk, articles, total } = this.props;
    if (articles.length < total) {
      getChunk(articles.length);
    }
  }

  handleLoadMore = () => {
    const { total, cachedLength, articles, getChunk, mergeCached } = this.props;
    mergeCached();
    const skip = articles.length + cachedLength;
    if (skip < total) {
      getChunk(skip);
    }
  };

  render() {
    const { articles, articlesPending, total, url } = this.props;

    const {
      query: { lang },
    } = url;

    const articlesRows = getMainArticlesRows(articles, ROW_SIZE, COMPLEX_ROW_SIZE);
    const [firstRow, secondRow, ...remainRows] = articlesRows;

    return (
      <PageLayout className="page-content main-page page-container" url={url}>
        {firstRow && <ArticlesRow articles={firstRow} className="first-line is-ancestor" />}
        {secondRow && (
          <ArticlesComplexRow articles={secondRow} renderDiary={() => <Diary lang={lang} />} />
        )}
        {remainRows.map(data => (
          <ArticlesRow key={data[0]._id} articles={data} className="first-line is-ancestor" />
        ))}
        {articles.length < total && (
          <div className="load-more" align="center">
            <Button className="button" pending={articlesPending} onClick={this.handleLoadMore}>
              <Text id="home.loadMore" />
            </Button>
          </div>
        )}
      </PageLayout>
    );
  }
}

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(HomePage);
