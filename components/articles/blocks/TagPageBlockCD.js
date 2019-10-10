import './tagPageBlockCD.scss';

import React from 'react';
import PropTypes from 'prop-types';

import ArticleCard from 'components/articles/cards/ArticleCard';
import PlaceholderCard from 'components/articles/cards/PlaceholderCard';

import { ArticlesArray } from 'utils/customPropTypes';

import BlockWrapper from './BlockWrapper';

const SIZE_BY_LAYOUT = {
  'row-of-two': 2,
  'row-of-three': 3,
};

const TagPageBlockCD = ({ articles, layout }) => (
  <BlockWrapper className={`tag-page-block-cd tag-page-block-cd__style-${layout}`}>
    {Array.from({ length: SIZE_BY_LAYOUT[layout] }).map((_, i) => (
      // eslint-disable-next-line react/no-array-index-key
      <div key={i} className="tag-page-block-cd__card">
        {articles[i] ? (
          <ArticleCard {...articles[i]} context={['tag-page-block-cd', layout]} />
        ) : (
          <PlaceholderCard />
        )}
      </div>
    ))}
  </BlockWrapper>
);

TagPageBlockCD.propTypes = {
  articles: ArticlesArray.isRequired,
  layout: PropTypes.oneOf(Object.keys(SIZE_BY_LAYOUT)).isRequired,
};

export default TagPageBlockCD;
