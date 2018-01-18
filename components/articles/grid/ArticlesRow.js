import React from 'react';
import PropTypes from 'prop-types';
import articlePropTypes from 'utils/customPropTypes';
import ArticlePreview from '../ArticlePreview';

const ArticlesRow = ({ articles }) => (
  <div className="articles-row tile is-ancestor">
    {articles && articles.map(article => <ArticlePreview {...article} />)}
  </div>
);

ArticlesRow.propTypes = {
  articles: PropTypes.arrayOf(articlePropTypes).isRequired,
};

export default ArticlesRow;
