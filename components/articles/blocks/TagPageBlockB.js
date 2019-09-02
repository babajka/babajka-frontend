import './tagPageBlockB.scss';

import React from 'react';
import PropTypes from 'prop-types';

import ArticleCard from 'components/articles/cards/ArticleCard';
import { ArticlesArray } from 'utils/customPropTypes';

const CLASS_BY_LAYOUT = {
  'large-left': 'left',
  'large-right': 'right',
};

const TagPageBlockB = ({ articles, layout }) => {
  const [first, second] =
    layout === 'large-left' ? articles.slice(0, 2) : articles.slice(0, 2).reverse();
  return (
    <div
      className={`block block__no-background tag-page-block-b tag-page-block-b__style-large-${
        CLASS_BY_LAYOUT[layout]
      }`}
    >
      <div className="large-card">
        <ArticleCard {...first} />
      </div>

      <div className="small-card">
        <ArticleCard {...second} />
      </div>
    </div>
  );
};

TagPageBlockB.propTypes = {
  articles: ArticlesArray.isRequired,
  layout: PropTypes.oneOf(Object.keys(CLASS_BY_LAYOUT)).isRequired,
};

export default TagPageBlockB;
