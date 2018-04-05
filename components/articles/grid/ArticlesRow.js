import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { ArticlesArray } from 'utils/customPropTypes';

import ArticlePreview from '../ArticlePreview';

const ArticlesRow = ({ articles, className }) => (
  <div className={classNames(className, 'tile')}>
    {articles &&
      articles.map(article => (
        <ArticlePreview key={article.articleId} imageClassName="is-3by2" {...article} />
      ))}
  </div>
);

ArticlesRow.propTypes = {
  articles: ArticlesArray.isRequired, // eslint-disable-line react/no-typos
  className: PropTypes.string,
};

ArticlesRow.defaultProps = {
  className: '',
};
export default ArticlesRow;
