import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withRedux from 'next-redux-wrapper';

import PageLayout from 'components/common/PageLayout';
import Button from 'components/common/Button';
import ArticlesRow from 'components/articles/grid/ArticlesRow';
import Diary from 'components/articles/Diary';
import ArticlesComplexRow from 'components/articles/grid/ArticlesComplexRow';

import { ArticlesArray, DiaryShape } from 'utils/customPropTypes';

import initStore from 'redux/store';
import { actions as articlesActions, selectors as articlesSelectors } from 'redux/ducks/articles';
import { actions as auth } from 'redux/ducks/auth';
import { actions as diaryActions, selectors as diarySelectors } from 'redux/ducks/diary';
import request from 'utils/request';
import text from 'constants/dictionary';
import { DEFAULT_LOCALE } from 'constants';

const mapStateToProps = (state, { url: { query } }) => ({
  articles: articlesSelectors.getAll(state, query.lang),
  error: articlesSelectors.isError(state),
  diary: diarySelectors.getCurrent(state),
});

const mapDispatchToProps = {
  getByDay: diaryActions.getByDay,
};

const FIRST_LINE_END = 4;

class HomePage extends Component {
  static propTypes = {
    url: PropTypes.shape({
      query: PropTypes.object.isRequired,
    }).isRequired,
    articles: ArticlesArray.isRequired,
    diary: DiaryShape.isRequired,
    getByDay: PropTypes.func.isRequired,
    error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]).isRequired,
  };

  static getInitialProps(ctx) {
    // TODO: somehow extract getCurrentUser to populate method
    return request.populate(ctx, [
      auth.getCurrentUser,
      articlesActions.fetchAll,
      diaryActions.getByDay.bind(null, DEFAULT_LOCALE, '02', '17'), // temporarily
    ]);
  }

  render() {
    const { articles, error, diary, getByDay, url } = this.props;
    return (
      <PageLayout url={url}>
        <div className="main-page page-container">
          <ArticlesRow
            articles={articles.slice(0, FIRST_LINE_END)}
            className="first-line is-ancestor"
          />
          <ArticlesComplexRow
            articles={articles}
            renderDiary={() => (
              <Diary {...diary} getNextDiary={() => getByDay()} getPrevDiary={() => getByDay()} />
            )}
          />
          <div className="load-more" align="center">
            <Button className="button">{text.loadMoreButton}</Button>
          </div>
        </div>
        {error && <p>{error}</p>}
      </PageLayout>
    );
  }
}

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(HomePage);
