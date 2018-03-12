import React from 'react';
import PropTypes from 'prop-types';
import articlePropTypes from 'utils/customPropTypes';
import ArticleRow from './ArticlesRow';

const ArticlesComplexRow = ({ articles, diary }) => (
  <div className="second-line tile is-ancestor">
    <div className="tile is-vertical is-8">
      <ArticleRow articles={articles.slice(0, 2)} />
      <ArticleRow articles={articles.slice(2, 4)} />
    </div>

    <div className="tile is-vertical">{diary()}</div>
  </div>
);

ArticlesComplexRow.propTypes = {
  articles: PropTypes.arrayOf(articlePropTypes).isRequired,
  diary: PropTypes.func.isRequired,
};

export default ArticlesComplexRow;
