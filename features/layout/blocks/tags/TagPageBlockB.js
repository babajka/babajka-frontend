import React from 'react';
import PropTypes from 'prop-types';
import bem from 'bem-css-modules';

import ArticleCard from 'features/layout/cards/article';
import PlaceholderCard from 'features/layout/cards/placeholder';

import { ArticlesArray } from 'utils/customPropTypes';

import BlockWrapper from 'features/layout/blocks/wrapper';
import styles from './tagPageBlockB.module.scss';

const b = bem(styles);

const TagPageBlockB = ({ articles, layout, inViewport }) => {
  const resolvedLayout = articles.length === 1 ? 'large-left' : layout;

  const [first, second] =
    resolvedLayout === 'large-left' ? articles.slice(0, 2) : articles.slice(0, 2).reverse();

  return (
    <BlockWrapper className={b({ style: resolvedLayout })}>
      <div className={styles['large-card']}>
        <ArticleCard
          {...first}
          blockContext={['tag-page-block-b', 'tag-page-block-b__large-card']}
          inViewport={inViewport}
        />
      </div>

      <div className={styles['small-card']}>
        {second ? (
          <ArticleCard
            {...second}
            blockContext={['tag-page-block-b', 'tag-page-block-b__small-card']}
            inViewport={inViewport}
          />
        ) : (
          <PlaceholderCard blockContext={['tag-page-block-b', 'tag-page-block-b__small-card']} />
        )}
      </div>
    </BlockWrapper>
  );
};

TagPageBlockB.propTypes = {
  articles: ArticlesArray.isRequired,
  layout: PropTypes.oneOf(['large-left', 'large-right']).isRequired,
};

export default TagPageBlockB;
