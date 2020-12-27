import React from 'react';
import PropTypes from 'prop-types';
import chunk from 'lodash/chunk';

import FeaturedBlock from 'features/layout/blocks/articles/FeaturedBlock';
import TagPageBlockB from 'features/layout/blocks/tags/TagPageBlockB';
import TagPageBlockCD from 'features/layout/blocks/tags/TagPageBlockCD';

import {
  ArticlePreviewArray,
  ArticlePreviewsById,
  TagsById,
  TopicsById,
} from 'utils/customPropTypes';

const PAGE_LEVEL_ORDER = ['B1', 'C', 'D', 'C', 'B2', 'C', 'D', 'C'];

const BLOCK_BY_LEVEL = {
  B1: TagPageBlockB,
  B2: TagPageBlockB,
  C: TagPageBlockCD,
  D: TagPageBlockCD,
};

const LAYOUT_BY_LEVEL = {
  B1: 'large-left',
  B2: 'large-right',
  C: 'row-of-three',
  D: 'row-of-two',
};

// returns a list of articles coupled by 2 or 3
// 5 articles = 2 blocks (2 + 3)
const arrangeListInBlocks = articles =>
  chunk(articles, 5).reduce(
    (blocks, blockOf5) =>
      blocks.concat([blockOf5.slice(0, 2), blockOf5.slice(2)]).filter(b => b.length),
    []
  );

export const ArticlesList = ({ articles, inViewport }) => {
  if (articles.length === 1) {
    const { articleId } = articles[0];
    return (
      <FeaturedBlock
        // This is a workaround in order to use FeaturedBlock as it is.
        block={{ frozen: true, articleId }}
        data={{ articles: { [articleId]: articles[0] } }}
        inViewport={inViewport}
      />
    );
  }

  if (articles.length === 3) {
    // If articles' list contains exactly 3 articles, we treat it in a special way:
    // we do not want 3 articles to be rendered in a same way as *3 first articles* are rendered in generic composition.
    return (
      <TagPageBlockCD articles={articles} layout={LAYOUT_BY_LEVEL.C} inViewport={inViewport} />
    );
  }

  const blocks = arrangeListInBlocks(articles);

  return blocks.map((block, index) => {
    const levelName = PAGE_LEVEL_ORDER[index % PAGE_LEVEL_ORDER.length];
    const Block = BLOCK_BY_LEVEL[levelName];
    return (
      <Block
        // eslint-disable-next-line react/no-array-index-key
        key={index}
        articles={block}
        layout={LAYOUT_BY_LEVEL[levelName]}
        inViewport={inViewport && index < 1}
      />
    );
  });
};

ArticlesList.propTypes = {
  articles: ArticlePreviewArray.isRequired,
};

const ArticlesListBlock = ({ block: { articles }, data, inViewport }) => {
  if (!articles.length) {
    // It's ok to have block template in fibery: it should be ignored unless it is filled with data.
    return null;
  }
  return (
    <ArticlesList
      articles={articles.map(articleId => data.articles[articleId])}
      inViewport={inViewport}
    />
  );
};

ArticlesListBlock.propTypes = {
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

export default ArticlesListBlock;
