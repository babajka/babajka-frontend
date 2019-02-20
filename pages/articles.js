import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Button from 'components/common/Button';
import Text from 'components/common/Text';
import Diary from 'components/specials/Diary';
import ArticlesRow from 'components/articles/ArticlesRow';
import ArticlesComplexRow from 'components/articles/ArticlesComplexRow';

import { ArticlesArray } from 'utils/customPropTypes';
import { getMainArticlesRows } from 'utils/getters';
import { populateRequest } from 'utils/request';

import { ROW_SIZE, COMPLEX_ROW_SIZE } from 'constants/articles';
import { articlesActions, articlesSelectors } from 'redux/ducks/articles';

import 'styles/legacy/main-page/main-page.scss';

const mapStateToProps = (state, { lang }) => ({
  articles: articlesSelectors.getAll(state, lang),
  articlesPending: articlesSelectors.isPending(state),
  total: articlesSelectors.getTotal(state),
  error: articlesSelectors.isError(state),
});

const mapDispatchToProps = {
  getChunk: articlesActions.fetchChunk,
  mergeCached: articlesActions.mergeCached,
};

class ArticlesPage extends Component {
  static propTypes = {
    articles: ArticlesArray.isRequired,
    articlesPending: PropTypes.bool.isRequired,
    getChunk: PropTypes.func.isRequired,
    mergeCached: PropTypes.func.isRequired,
    total: PropTypes.number.isRequired,
  };

  static getInitialProps(ctx) {
    return populateRequest(ctx, articlesActions.initialFetch);
  }

  static getLayoutProps = () => ({
    title: 'header.articles',
  });

  componentDidMount() {
    const { getChunk } = this.props;
    getChunk();
  }

  handleLoadMore = () => {
    const { getChunk, mergeCached } = this.props;
    mergeCached();
    getChunk();
  };

  render() {
    const { articles, articlesPending, total } = this.props;
    const articlesRows = getMainArticlesRows(articles, ROW_SIZE, COMPLEX_ROW_SIZE);
    const [firstRow, secondRow, ...remainRows] = articlesRows;

    return (
      <div className="page-content main-page page-container">
        {firstRow && <ArticlesRow articles={firstRow} className="first-line is-ancestor" />}
        {secondRow && <ArticlesComplexRow articles={secondRow} renderDiary={() => <Diary />} />}
        {remainRows.map(data => (
          <ArticlesRow key={data[0]._id} articles={data} className="first-line is-ancestor" />
        ))}
        {articles.length < total && (
          <div className="load-more" align="center">
            <Button className="button" pending={articlesPending} onClick={this.handleLoadMore}>
              <Text id="common.loadMore" />
            </Button>
          </div>
        )}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticlesPage);
