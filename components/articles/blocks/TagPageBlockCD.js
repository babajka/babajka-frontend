import './tagPageBlockCD.scss';

import React from 'react';
import PropTypes from 'prop-types';

import ArticleCard from 'components/articles/cards/ArticleCard';

const TagPageBlockCD = ({ articles, layout }) => (
  <div
    className={`block block__no-background tag-page-block-cd ${
      layout === 'row-of-two'
        ? 'tag-page-block-cd__style-row-of-two'
        : 'tag-page-block-cd__style-row-of-three'
    }`}
  >
    {articles.slice(0, layout === 'row-of-two' ? 2 : 3).map(article => (
      <div className="tag-page-block-cd__card">
        <ArticleCard {...article} />
      </div>
    ))}
  </div>
);

TagPageBlockCD.propTypes = {
  articles: PropTypes.shape({}).isRequired,
  layout: PropTypes.oneOf(['row-of-two', 'row-of-three']).isRequired,
};

export default TagPageBlockCD;
