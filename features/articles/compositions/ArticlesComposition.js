import React from 'react';
import chunk from 'lodash/chunk';

import FeaturedBlock from 'features/articles/blocks/FeaturedBlock';
import TagPageBlockB from 'features/articles/blocks/TagPageBlockB';
import TagPageBlockCD from 'features/articles/blocks/TagPageBlockCD';

import { ArticlePreviewArray } from 'utils/customPropTypes';

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

const ArticlesComposition = ({ articles }) => {
  if (articles.length === 1) {
    const { articleId } = articles[0];
    return (
      <FeaturedBlock
        // This is a workaround in order to use FeaturedBlock as it is.
        block={{ frozen: true, articleId }}
        data={{ articles: { [articleId]: articles[0] } }}
      />
    );
  }

  if (articles.length === 3) {
    // If articles' list contains exactly 3 articles, we treat it in a special way:
    // we do not want 3 articles to be rendered in a same way as *3 first articles* are rendered in generic composition.
    return <TagPageBlockCD articles={articles} layout={LAYOUT_BY_LEVEL.C} />;
  }

  const blocks = arrangeListInBlocks(articles);

  return blocks.map((block, index) => {
    const levelName = PAGE_LEVEL_ORDER[index % PAGE_LEVEL_ORDER.length];
    const Block = BLOCK_BY_LEVEL[levelName];
    // eslint-disable-next-line react/no-array-index-key
    return <Block key={index} articles={block} layout={LAYOUT_BY_LEVEL[levelName]} />;
  });
};

ArticlesComposition.propTypes = {
  articles: ArticlePreviewArray.isRequired,
};

export default ArticlesComposition;
