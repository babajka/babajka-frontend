import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withRedux from 'next-redux-wrapper';
import initStore from 'redux/store';

import CoreLayout from 'components/common/CoreLayout';
import ArticlesRow from 'components/articles/grid/ArticlesRow';
import Diary from 'components/articles/Diary';
import ArticlesComplexRow from 'components/articles/grid/ArticlesComplexRow';
import { diaryPropTypes, articlePropTypes } from 'utils/customPropTypes';
import { actions as articlesActions, selectors as articlesSelectors } from 'redux/ducks/articles';
import { actions as auth } from 'redux/ducks/auth';
import { actions as diaryActions, selectors as diarySelectors } from 'redux/ducks/diary';
import request from 'utils/request';

const mapStateToProps = state => ({
  articles: articlesSelectors.getAll(state),
  diary: diarySelectors.getDiary(state),
  error: articlesSelectors.isError(state),
});

const mapDispatchToProps = dispatch => ({
  getByDay: () => dispatch(diaryActions.getByDay()),
});

class HomePage extends Component {
  static propTypes = {
    articles: PropTypes.arrayOf(articlePropTypes).isRequired,
    diary: diaryPropTypes.isRequired,
    getByDay: PropTypes.func.isRequired,
    error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]).isRequired,
  };

  static getInitialProps(ctx) {
    // TODO: somehow extract getCurrentUser to populate method
    return request.populate(ctx, [
      auth.getCurrentUser,
      articlesActions.fetchAll,
      diaryActions.getByDay,
    ]);
  }

  render() {
    const { articles, error, diary, getByDay } = this.props;
    return (
      <CoreLayout>
        <div className="main-page page-container">
          <div className="page-content">
            <ArticlesRow articles={articles.slice(0, 4)} />
            <ArticlesComplexRow
              articles={articles}
              diary={() => (
                <Diary {...diary} getNextDiary={() => getByDay()} getPrevDiary={() => getByDay()} />
              )}
            />
          </div>
        </div>
        {error && <p>{error}</p>}
      </CoreLayout>
    );
  }
}

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(HomePage);
