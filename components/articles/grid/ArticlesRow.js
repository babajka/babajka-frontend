import React from 'react';
import PropTypes from 'prop-types';
import { ArticleModel } from 'utils/customPropTypes';
import ArticlePreview from '../ArticlePreview';

const ArticlesRow = ({ articles }) => (
  <div className="articles-row tile is-ancestor">
    {articles && articles.map(article => <ArticlePreview key={article.articleId} {...article} />)}
  </div>
);

ArticlesRow.propTypes = {
  articles: PropTypes.arrayOf(PropTypes.shape(ArticleModel)).isRequired,
};

export default ArticlesRow;
