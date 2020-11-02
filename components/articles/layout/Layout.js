import React from 'react';
import PropTypes from 'prop-types';

import keyBy from 'lodash/keyBy';

import BLOCKS_BY_TYPE from 'components/articles/blocks';

import { ArticlesArray, ArticlesById, TopicsById, TagsById, LangType } from 'utils/customPropTypes';

const CardsLayout = ({ blocks, data, lang }) => {
  const blocksByType = keyBy(blocks, 'type');
  return blocks.map((block, index) => {
    const Block = BLOCKS_BY_TYPE[block.type];
    if (!Block) {
      return null;
    }
    return (
      // eslint-disable-next-line react/no-array-index-key
      <Block key={index} block={block} data={data} blocks={blocksByType} lang={lang} />
    );
  });
};

CardsLayout.propTypes = {
  blocks: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.oneOf(Object.keys(BLOCKS_BY_TYPE)).isRequired,
    })
  ).isRequired,
  data: PropTypes.shape({
    articles: ArticlesById.isRequired,
    tags: TagsById.isRequired,
    topics: TopicsById.isRequired,
    latestArticles: ArticlesArray.isRequired,
  }).isRequired,
  lang: LangType.isRequired,
};

export default CardsLayout;
