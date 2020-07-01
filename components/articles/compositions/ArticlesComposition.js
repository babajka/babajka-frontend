import React from 'react';
import PropTypes from 'prop-types';

import FeaturedBlock from 'components/articles/blocks/FeaturedBlock';
import TagPageBlockB from 'components/articles/blocks/TagPageBlockB';
import TagPageBlockCD from 'components/articles/blocks/TagPageBlockCD';

import { ArticlesArray } from 'utils/customPropTypes';

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

const ArticlesComposition = ({ articlesCount, blocks }) => {
  if (articlesCount === 1) {
    const [article] = blocks[0];
    const { articleId } = article;
    return (
      <FeaturedBlock
        // This is a workaround in order to use FeaturedBlock as it is.
        block={{ frozen: true, articleId }}
        data={{ articles: { [articleId]: article } }}
      />
    );
  }

  return blocks.map((block, index) => {
    const levelName = PAGE_LEVEL_ORDER[index % PAGE_LEVEL_ORDER.length];
    const Block = BLOCK_BY_LEVEL[levelName];
    // eslint-disable-next-line react/no-array-index-key
    return <Block key={index} articles={block} layout={LAYOUT_BY_LEVEL[levelName]} />;
  });
};

ArticlesComposition.propTypes = {
  articlesCount: PropTypes.number.isRequired,
  blocks: PropTypes.arrayOf(ArticlesArray).isRequired,
};

export default ArticlesComposition;
