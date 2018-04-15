import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withRedux from 'next-redux-wrapper';

import PageLayout from 'components/common/layout/PageLayout';
import Button from 'components/common/Button';
import Text from 'components/common/Text';
import ArticlesRow from 'components/articles/grid/ArticlesRow';
import Diary from 'components/articles/Diary';
import ArticlesComplexRow from 'components/articles/grid/ArticlesComplexRow';

import { ArticlesArray, DiaryShape, PaginationShape } from 'utils/customPropTypes';
import { getArticlesRows } from 'utils/getters';

import initStore from 'redux/store';
import { actions as articlesActions, selectors as articlesSelectors } from 'redux/ducks/articles';
import { actions as auth } from 'redux/ducks/auth';
import { actions as diaryActions, selectors as diarySelectors } from 'redux/ducks/diary';
import request from 'utils/request';

const mapStateToProps = (state, { url: { query } }) => ({
  articles: articlesSelectors.getAll(state, query.lang),
  pagination: articlesSelectors.getPagination(state),
  error: articlesSelectors.isError(state),
  diary: diarySelectors.getCurrent(state),
});

const mapDispatchToProps = {
  getByDay: diaryActions.getByDay,
  getChunk: articlesActions.fetchChunk,
};

const ROW_SIZE = 4;
const FIRST_PAGE_NUMBER = 0;
const PAGE_SIZE = 8;

class HomePage extends Component {
  static propTypes = {
    url: PropTypes.shape({
      query: PropTypes.object.isRequired,
    }).isRequired,
    articles: ArticlesArray.isRequired,
    diary: DiaryShape.isRequired,
    pagination: PropTypes.oneOfType([PropTypes.bool, PaginationShape]).isRequired,
    getChunk: PropTypes.func.isRequired,
    getByDay: PropTypes.func.isRequired,
    error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]).isRequired,
  };

  static getInitialProps(ctx) {
    // TODO: somehow extract getCurrentUser to populate method
    const initialRequests = [
      auth.getCurrentUser,
      // diaryActions.getByDay.bind(null, DEFAULT_LOCALE, '02', '13'), // FIXME(@tyndria) temporarily
      articlesActions.fetchChunk.bind(null, FIRST_PAGE_NUMBER, PAGE_SIZE),
    ];

    return request.populate(ctx, initialRequests);
  }

  render() {
    const { articles, error, diary, pagination, getByDay, getChunk, url } = this.props;

    const articlesRows = getArticlesRows(articles, ROW_SIZE);
    const firstPageRows = { first: articlesRows[0], second: articlesRows[1] };
    const remainRows = articlesRows.slice(2);

    return (
      <PageLayout url={url}>
        <div className="main-page page-container">
          <div className="page-content">
            <ArticlesRow articles={firstPageRows.first} className="first-line is-ancestor" />
            <ArticlesComplexRow
              articles={firstPageRows.second}
              renderDiary={() => (
                <Diary {...diary} getNextDiary={() => getByDay()} getPrevDiary={() => getByDay()} />
              )}
            />

            {articles.length > PAGE_SIZE &&
              remainRows.map(data => (
                <ArticlesRow key={data[0]._id} articles={data} className="first-line is-ancestor" />
              ))}
            <div className="load-more" align="center">
              {pagination && (
                <Button className="button" onClick={() => getChunk(pagination.page, PAGE_SIZE)}>
                  <Text id="home.loadMore" />
                </Button>
              )}
            </div>
          </div>
        </div>
        {error && <p>{error}</p>}
      </PageLayout>
    );
  }
}

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(HomePage);
