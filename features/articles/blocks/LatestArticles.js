import React from 'react';
import PropTypes from 'prop-types';

import TwoArticlesInRow from './TwoArticlesInRow';

const getData = ({ articles, latestArticles }, { id, frozen }, nextIndex) => {
  if (frozen) {
    return [articles[id], nextIndex];
  }
  return [latestArticles[nextIndex], nextIndex + 1];
};

const LatestArticles = ({ block, data, blocks }) => {
  const { articlesIds } = block;
  const [first, second] = articlesIds;
  // TODO: to handle situation with multiple 'featured' blocks or 'featured' blocks
  // going *after* latestArticles.
  const { featured } = blocks;
  let nextIndex = featured && !featured.frozen ? 1 : 0;
  const resolvedData = {};
  [resolvedData.first, nextIndex] = getData(data, first, nextIndex);
  [resolvedData.second] = getData(data, second, nextIndex);
  return <TwoArticlesInRow {...resolvedData} />;
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
  blocks: PropTypes.shape({}).isRequired,
};

export default LatestArticles;
