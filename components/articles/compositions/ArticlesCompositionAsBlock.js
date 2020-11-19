import React from 'react';
import PropTypes from 'prop-types';

import {
  ArticlePreviewArray,
  ArticlePreviewsById,
  TagsById,
  TopicsById,
} from 'utils/customPropTypes';
import { getArticlesBlocks } from 'utils/getters';

import ArticlesComposition from './ArticlesComposition';

const ArticlesCompositionAsBlock = ({ block: { articles }, data }) => {
  if (!articles.length) {
    // It's ok to have block template in fibery: it should be ignored unless it is filled with data.
    return null;
  }
  return (
    <ArticlesComposition
      articlesCount={articles.length}
      blocks={getArticlesBlocks(articles.map(articleId => data.articles[articleId]))}
    />
  );
};

ArticlesCompositionAsBlock.propTypes = {
  block: PropTypes.shape({
    articles: PropTypes.arrayOf(ArticlePreviewArray).isRequired,
  }).isRequired,
  data: PropTypes.shape({
    articles: ArticlePreviewsById.isRequired,
    tags: TagsById,
    topics: TopicsById,
    latestArticles: ArticlePreviewArray,
  }).isRequired,
};

export default ArticlesCompositionAsBlock;