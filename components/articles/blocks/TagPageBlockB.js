import './tagPageBlockB.scss';

import React from 'react';
import PropTypes from 'prop-types';

import ArticleCard from 'components/articles/cards/ArticleCard';

const TagPageBlockB = ({ articles, layout }) => (
  <div
    className={`block block__no-background tag-page-block-b ${
      layout === 'large-left'
        ? 'tag-page-block-b__style-large-left'
        : 'tag-page-block-b__style-large-right'
    }`}
  >
    <div className="large-card">
      <ArticleCard {...articles[layout === 'large-left' ? 0 : 1]} />
    </div>

    <div className="small-card">
      <ArticleCard {...articles[layout === 'large-left' ? 1 : 0]} />
    </div>
  </div>
);

TagPageBlockB.propTypes = {
  articles: PropTypes.shape({}).isRequired,
  layout: PropTypes.oneOf(['large-left', 'large-right']).isRequired,
};

export default TagPageBlockB;
