import React from 'react';
import PropTypes from 'prop-types';

import keyBy from 'lodash/keyBy';

import { BLOCKS_BY_TYPE } from 'features/layout/blocks';

import {
  ArticlePreviewArray,
  ArticlePreviewsById,
  TopicsById,
  TagsById,
} from 'utils/customPropTypes';

const CardBlocksLayout = ({ blocks, data, inViewport }) => {
  const blocksByType = keyBy(blocks, 'type');
  return blocks.map((block, index) => {
    const Block = BLOCKS_BY_TYPE[block.type];
    if (!Block) {
      return null;
    }

    const maxViewportBlockNumber = block.type === 'banner' ? 2 : 1;

    return (
      <Block
        // eslint-disable-next-line react/no-array-index-key
        key={index}
        block={block}
        data={data}
        blocks={blocksByType}
        inViewport={inViewport && index < maxViewportBlockNumber}
      />
    );
  });
};

CardBlocksLayout.propTypes = {
  blocks: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.oneOf(Object.keys(BLOCKS_BY_TYPE)).isRequired,
    })
  ).isRequired,
  data: PropTypes.shape({
    articles: ArticlePreviewsById,
    tags: TagsById,
    topics: TopicsById,
    latestArticles: ArticlePreviewArray,
  }).isRequired,
};

export default CardBlocksLayout;
