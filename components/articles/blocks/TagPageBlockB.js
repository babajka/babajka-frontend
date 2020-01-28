import './tagPageBlockB.scss';

import React from 'react';
import PropTypes from 'prop-types';

import ArticleCard from 'components/articles/cards/ArticleCard';
import { ArticlesArray } from 'utils/customPropTypes';

import BlockWrapper from './BlockWrapper';

const TagPageBlockB = ({ articles, layout }) => {
  const [first, second] =
    layout === 'large-left' ? articles.slice(0, 2) : articles.slice(0, 2).reverse();
  return (
    <BlockWrapper className={`tag-page-block-b tag-page-block-b__style-${layout}`}>
      <div className="large-card">
        <ArticleCard {...first} context={['tag-page-block-b', 'large-card']} />
      </div>

      <div className="small-card">
        <ArticleCard {...second} context={['tag-page-block-b', 'small-card']} />
      </div>
    </BlockWrapper>
  );
};

TagPageBlockB.propTypes = {
  articles: ArticlesArray.isRequired,
  layout: PropTypes.oneOf(['large-left', 'large-right']).isRequired,
};

export default TagPageBlockB;
