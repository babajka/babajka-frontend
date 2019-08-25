import React from 'react';
import PropTypes from 'prop-types';

import ArticleCard from 'components/articles/cards/ArticleCard';

const FeaturedBlock = ({ block, data }) => {
  // Another usage for FeaturedBlock is a Block A on Topic page.
  const { articleId, frozen } = block;
  const { articles, latestArticles } = data;
  const articleData = frozen ? articles[articleId] : latestArticles[0];
  return (
    <div className="block block__no-background featured">
      <ArticleCard {...articleData} />
    </div>
  );
};

FeaturedBlock.propTypes = {
  block: PropTypes.shape({
    articleId: PropTypes.string,
    frozen: PropTypes.bool.isRequired,
  }).isRequired,
  data: PropTypes.shape({}).isRequired,
};

export default FeaturedBlock;