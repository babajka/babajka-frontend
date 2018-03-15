import React from 'react';
import PropTypes from 'prop-types';
import { ArticleModel } from 'utils/customPropTypes';
import ArticleRow from './ArticlesRow';

const FIRST_LINE_END = 2;
const SECOND_LINE_END = 4;

const ArticlesComplexRow = ({ articles }) => (
  <div className="second-line tile is-ancestor">
    <div className="tile is-vertical is-8">
      <ArticleRow articles={articles.slice(0, FIRST_LINE_END)} />
      <ArticleRow articles={articles.slice(FIRST_LINE_END, SECOND_LINE_END)} />
    </div>

    <div className="tile is-vertical">
      {/* <Diary {...articles[0]} text={articles[0].text} /> */}
    </div>
  </div>
);

ArticlesComplexRow.propTypes = {
  articles: PropTypes.arrayOf(PropTypes.shape(ArticleModel)).isRequired,
};

export default ArticlesComplexRow;
