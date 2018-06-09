import React from 'react';
import PropTypes from 'prop-types';

import { ArticlesArray } from 'utils/customPropTypes';

import ArticleRow from './ArticlesRow';
import ArticlePreview from './ArticlePreview';

const FIRST_LINE_END = 2;
const SECOND_LINE_END = 5;
const MIN_TILES_IN_ROW = 2;

const ArticlesComplexRow = ({ articles, renderDiary }) => {
  const length = Math.max(0, MIN_TILES_IN_ROW - articles.length);
  return (
    <div className="second-line">
      <div className="tile is-ancestor">
        {articles &&
          articles
            .slice(0, FIRST_LINE_END)
            .map(article => (
              <ArticlePreview key={article.articleId} imageClassName="is-3by2" {...article} />
            ))}

        {renderDiary()}
        {Array.from({ length }, (_, i) => <div key={`empty-tile-${i}`} className="tile" />)}
      </div>

      <ArticleRow
        className="is-ancestor"
        articles={articles.slice(FIRST_LINE_END, SECOND_LINE_END)}
      />
    </div>
  );
};

ArticlesComplexRow.propTypes = {
  articles: ArticlesArray.isRequired, // eslint-disable-line react/no-typos
  renderDiary: PropTypes.func.isRequired,
};

export default ArticlesComplexRow;
