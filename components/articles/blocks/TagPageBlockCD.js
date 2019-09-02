import './tagPageBlockCD.scss';

import React from 'react';
import PropTypes from 'prop-types';

import ArticleCard from 'components/articles/cards/ArticleCard';
import { ArticlesArray } from 'utils/customPropTypes';

const SIZE_BY_LAYOUT = {
  'row-of-two': 2,
  'row-of-three': 3,
};

const TagPageBlockCD = ({ articles, layout }) => (
  <div
    className={`block block__no-background tag-page-block-cd tag-page-block-cd__style-${layout}`}
  >
    {articles.slice(0, SIZE_BY_LAYOUT[layout]).map(article => (
      <div key={article.articleId} className="tag-page-block-cd__card">
        <ArticleCard {...article} />
      </div>
    ))}
  </div>
);

TagPageBlockCD.propTypes = {
  articles: ArticlesArray.isRequired,
  layout: PropTypes.oneOf(Object.keys(SIZE_BY_LAYOUT)).isRequired,
};

export default TagPageBlockCD;
