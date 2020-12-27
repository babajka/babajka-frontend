import React from 'react';
import PropTypes from 'prop-types';
import bem from 'bem-css-modules';

import ArticleCard from 'features/articles/cards/ArticleCard';
import PlaceholderCard from 'features/articles/cards/PlaceholderCard';

import { ArticlesArray } from 'utils/customPropTypes';

import styles from './tagPageBlockCD.module.scss';

import BlockWrapper from './BlockWrapper';

const b = bem(styles);

const SIZE_BY_LAYOUT = {
  'row-of-two': 2,
  'row-of-three': 3,
};

const TagPageBlockCD = ({ articles, layout }) => (
  <BlockWrapper className={b({ layout })}>
    {Array.from({ length: SIZE_BY_LAYOUT[layout] }).map((_, i) => (
      // eslint-disable-next-line react/no-array-index-key
      <div key={i} className={b('card')}>
        {articles[i] ? (
          <ArticleCard
            {...articles[i]}
            blockContext={['tag-page-block-cd', `tag-page-block-cd__${layout}`]}
          />
        ) : (
          <PlaceholderCard blockContext={['tag-page-block-cd', `tag-page-block-cd__${layout}`]} />
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
