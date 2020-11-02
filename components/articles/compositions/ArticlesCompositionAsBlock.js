import React from 'react';
import PropTypes from 'prop-types';

import { ArticlePreviewArray, ArticlesById, TagsById } from 'utils/customPropTypes';
import { getArticlesBlocks } from 'utils/getters';

import ArticlesComposition from './ArticlesComposition';

const ArticlesCompositionAsBlock = ({ block, data }) => {
  return (
    <ArticlesComposition
      articlesCount={block.articles.length}
      blocks={getArticlesBlocks(block.articles.map(articleId => data.articles[articleId]))}
    />
  );
};

ArticlesCompositionAsBlock.propTypes = {
  block: PropTypes.shape({
    articles: PropTypes.arrayOf(ArticlePreviewArray).isRequired,
  }).isRequired,
  data: PropTypes.shape({
    articles: ArticlesById.isRequired,
    tags: TagsById,
    // TODO: Complete.
  }).isRequired,
};

export default ArticlesCompositionAsBlock;
