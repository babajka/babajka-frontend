import './tagPageBlockB.scss';

import React from 'react';
import PropTypes from 'prop-types';

import ArticleCard from 'components/articles/cards/ArticleCard';

const TagPageBlockB = ({ articles, layout }) => {
  const [first, second] =
    layout === 'large-left' ? articles.slice(0, 2) : articles.slice(0, 2).reverse();
  return (
    <div
      className={`block block__no-background tag-page-block-b tag-page-block-b__style-large-${
        layout === 'large-left' ? 'left' : 'right'
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
  articles: PropTypes.shape({}).isRequired,
  layout: PropTypes.oneOf(['large-left', 'large-right']).isRequired,
};

export default TagPageBlockB;
