import React from 'react';
import PropTypes from 'prop-types';
import ArticlePreview from '../ArticlePreview';

const ArticlesRow = ({ articles }) => (
  <div className="articles-row tile is-ancestor">
    {articles && articles.map(article => <ArticlePreview {...article} />)}
  </div>
);

ArticlesRow.propTypes = {
  articles: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      subtitle: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ArticlesRow;
