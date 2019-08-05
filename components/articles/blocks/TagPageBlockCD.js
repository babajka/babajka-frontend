import './tagPageBlockCD.scss';

import React from 'react';
import PropTypes from 'prop-types';

import ArticleCard from 'components/articles/cards/ArticleCard';

import { IdsArray } from 'utils/customPropTypes';

const TagPageBlockCD = ({ block, data, style }) => {
  const { articlesIds } = block;
  const { articles } = data;

  return (
    <div
      className={`block block__no-background tag-page-block-cd ${
        style === 'row-of-two'
          ? 'tag-page-block-cd__style-row-of-two'
          : 'tag-page-block-cd__style-row-of-three'
      }`}
    >
      {articlesIds.slice(0, style === 'row-of-two' ? 2 : 3).map(id => (
        <div className="tag-page-block-cd__card">
          <ArticleCard {...articles[id]} />
        </div>
      ))}
    </div>
  );
};

TagPageBlockCD.propTypes = {
  block: PropTypes.shape({
    articlesIds: IdsArray.isRequired,
  }).isRequired,
  data: PropTypes.shape({}).isRequired,
  style: PropTypes.oneOf(['row-of-two', 'row-of-three']).isRequired,
};

export default TagPageBlockCD;
