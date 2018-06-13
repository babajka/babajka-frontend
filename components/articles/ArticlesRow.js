import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import CompleteRow from 'components/common/CompleteRow';

import { ArticlesArray } from 'utils/customPropTypes';

import ArticlePreview from './ArticlePreview';

const MIN_TILES_IN_ROW = 3;

const ArticlesRow = ({ articles, className }) => (
  <div className={cn(className, 'tile')}>
    {articles && (
      <CompleteRow className="tile" requiredSize={MIN_TILES_IN_ROW}>
        {articles.map(article => (
          <ArticlePreview key={article.articleId} imageClassName="is-3by2" {...article} />
        ))}
      </CompleteRow>
    )}
  </div>
);

ArticlesRow.propTypes = {
  articles: ArticlesArray.isRequired,
  className: PropTypes.string,
};

ArticlesRow.defaultProps = {
  className: '',
};
export default ArticlesRow;
