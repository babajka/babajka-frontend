import './twoInRow.scss';

import React from 'react';
import PropTypes from 'prop-types';

import ArticleCard from 'components/articles/cards/ArticleCard';

const getData = ({ articles, latestArticles }, id, index) => {
  if (id) {
    return articles[id];
  }
  return latestArticles[index];
};

const LatestArticles = ({ block, data, blocks }) => {
  const { articlesIds } = block;
  const [first, second] = articlesIds;
  const { featured } = blocks;
  const firstIndex = featured.frozen ? 0 : 1;
  const firstData = getData(data, first.id, firstIndex);
  const secondIndex = first.frozen ? firstIndex : firstIndex + 1;
  const secondData = getData(data, second.id, secondIndex);
  return (
    <div className="block block__no-background two-in-row">
      <div className="two-in-row__first">
        <ArticleCard {...firstData} />
      </div>
      <div className="two-in-row__second">
        <ArticleCard {...secondData} />
      </div>
    </div>
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
  blocks: PropTypes.shape({}).isRequired,
};

export default LatestArticles;
