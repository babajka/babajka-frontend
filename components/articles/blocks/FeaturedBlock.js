import React from 'react';
import PropTypes from 'prop-types';

import ArticleCard from 'components/articles/cards/ArticleCard';

import BlockWrapper from './BlockWrapper';

const FeaturedBlock = ({ block, data }) => {
  // Another usage for FeaturedBlock is a Block A on Topic page.
  const { articleId, frozen } = block;
  const { articles, latestArticles } = data;
  const articleData = frozen ? articles[articleId] : latestArticles[0];
  return (
    <BlockWrapper className="featured">
      <ArticleCard {...articleData} blockContext={['featured']} />
    </BlockWrapper>
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
