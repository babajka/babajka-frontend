import React from 'react';
import PropTypes from 'prop-types';
import articlePropTypes from 'utils/customPropTypes';
import ArticlesRow from './ArticlesRow';
import ArticlesComplexRow from './ArticlesComplexRow';

const ArticlesGrid = ({ firstLineArticles, restOfArticles }) => (
  <div className="article-grid">
    <ArticlesRow articles={firstLineArticles} />
    <ArticlesComplexRow articles={restOfArticles} />
  </div>
);

ArticlesGrid.propTypes = {
  firstLineArticles: PropTypes.arrayOf(articlePropTypes).isRequired,
  restOfArticles: PropTypes.arrayOf(articlePropTypes).isRequired,
};

export default ArticlesGrid;
