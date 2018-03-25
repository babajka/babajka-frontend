import React from 'react';
import PropTypes from 'prop-types';
import { ArticleModel } from 'utils/customPropTypes';
import classNames from 'classnames';
import ArticlePreview from '../ArticlePreview';

const ArticlesRow = ({ articles, className }) => (
  <div className={classNames(className, 'articles-row tile')}>
    {articles && articles.map(article => <ArticlePreview key={article.articleId} {...article} />)}
  </div>
);

ArticlesRow.propTypes = {
  articles: PropTypes.arrayOf(PropTypes.shape(ArticleModel)).isRequired,
  className: PropTypes.string,
};

ArticlesRow.defaultProps = {
  className: '',
};

export default ArticlesRow;
