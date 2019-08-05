import './tagPageBlockB.scss';

import React from 'react';
import PropTypes from 'prop-types';

import ArticleCard from 'components/articles/cards/ArticleCard';

import { IdsArray } from 'utils/customPropTypes';

const TagPageBlockB = ({ block, data, style }) => {
  const { articlesIds } = block;
  const { articles } = data;

  return (
    <div
      className={`block block__no-background tag-page-block-b ${
        style === 'large-left'
          ? 'tag-page-block-b__style-large-left'
          : 'tag-page-block-b__style-large-right'
      }`}
    >
      <div className="large-card">
        <ArticleCard {...articles[articlesIds[style === 'large-left' ? 0 : 1]]} />
      </div>

      <div className="small-card">
        <ArticleCard {...articles[articlesIds[style === 'large-left' ? 1 : 0]]} />
      </div>
    </div>
  );
};

TagPageBlockB.propTypes = {
  block: PropTypes.shape({
    articlesIds: IdsArray.isRequired,
  }).isRequired,
  data: PropTypes.shape({}).isRequired,
  style: PropTypes.oneOf(['large-left', 'large-right']).isRequired,
};

export default TagPageBlockB;
