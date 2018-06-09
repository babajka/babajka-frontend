import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { ArticlesArray } from 'utils/customPropTypes';

import ArticlePreview from './ArticlePreview';

const MIN_TILES_IN_ROW = 3;

const ArticlesRow = ({ articles, className }) => {
  const length = Math.max(0, MIN_TILES_IN_ROW - articles.length);
  return (
    <div className={classNames(className, 'tile')}>
      {articles &&
        articles.map(article => (
          <ArticlePreview key={article.articleId} imageClassName="is-3by2" {...article} />
        ))}
      {Array.from({ length }, (_, i) => <div key={`empty-tile-${i}`} className="tile" />)}
    </div>
  );
};

ArticlesRow.propTypes = {
  articles: ArticlesArray.isRequired,
  className: PropTypes.string,
};

ArticlesRow.defaultProps = {
  className: '',
};
export default ArticlesRow;
