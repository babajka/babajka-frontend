import React from 'react';
import PropTypes from 'prop-types';
import ArticlesRow from './ArticlesRow';
import ArticlesComplexRow from './ArticlesComplexRow';

const ArticlesGrid = ({ articles, firstLineArticlesNumber }) => (
  <div className="article-grid">
    <ArticlesRow articles={articles.slice(0, firstLineArticlesNumber + 1)} />
    <ArticlesComplexRow articles={articles} />
  </div>
);

ArticlesGrid.propTypes = {
  articles: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      subtitle: PropTypes.string.isRequired,
    })
  ).isRequired,
  firstLineArticlesNumber: PropTypes.number.isRequired,
};

export default ArticlesGrid;
