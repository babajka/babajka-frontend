import React from 'react';
import PropTypes from 'prop-types';
import { ArticleModel } from 'utils/customPropTypes';
import ArticleRow from './ArticlesRow';

const FIRST_LINE_END = 2;
const SECOND_LINE_END = 4;

const ArticlesComplexRow = ({ articles, diary }) => (
  <div className="second-line tile is-ancestor">
    <div className="tile is-vertical is-8">
      <ArticleRow articles={articles.slice(0, FIRST_LINE_END)} />
      <ArticleRow articles={articles.slice(FIRST_LINE_END, SECOND_LINE_END)} />
    </div>

    <div className="tile is-vertical">{diary()}</div>
  </div>
);

ArticlesComplexRow.propTypes = {
  diary: PropTypes.func.isRequired,
  articles: PropTypes.arrayOf(PropTypes.shape(ArticleModel)).isRequired,
};

export default ArticlesComplexRow;
