import './twoInRow.scss';

import React from 'react';
import PropTypes from 'prop-types';

import ArticleCard from 'components/articles/cards/ArticleCard';

import BlockWrapper from './BlockWrapper';

const getData = ({ articles, latestArticles }, { id, frozen }, nextIndex) => {
  if (frozen) {
    return [articles[id], nextIndex];
  }
  return [latestArticles[nextIndex], nextIndex + 1];
};

const LatestArticles = ({ block, data, className, options }) => {
  const { articlesIds } = block;
  const [first, second] = articlesIds;

  let nextIndex = options.offset;
  const resolvedData = {};
  [resolvedData.first, nextIndex] = getData(data, first, nextIndex);
  [resolvedData.second] = getData(data, second, nextIndex);

  return (
    <BlockWrapper className={`two-in-row ${className}`}>
      <div className="two-in-row__first">
        <ArticleCard {...resolvedData.first} context={['two-in-row', 'first']} />
      </div>
      <div className="two-in-row__second">
        <ArticleCard {...resolvedData.second} context={['two-in-row', 'second']} />
      </div>
    </BlockWrapper>
  );
};

LatestArticles.propTypes = {
  block: PropTypes.shape({
    articlesIds: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        frozen: PropTypes.bool,
      })
    ).isRequired,
  }).isRequired,
  data: PropTypes.shape({}).isRequired,
  className: PropTypes.string,
  options: PropTypes.shape({
    offset: PropTypes.number,
  }),
};

LatestArticles.defaultProps = {
  options: {
    offset: 0,
  },
  className: '',
};

export default LatestArticles;
