import './articlesByTag3.scss';

import React from 'react';
import PropTypes from 'prop-types';

import ArticleCard from 'components/articles/cards/ArticleCard';

import { IdsArray } from 'utils/customPropTypes';
import { getTagLink, getTopicLink } from 'utils/tags';

const ArticlesByTag3 = ({ block, data }) => {
  const { tagId, articlesIds } = block;
  const { tags, articles } = data;
  const tag = tags[tagId];
  const tagLink = getTagLink({ tag, dark: true });
  const topicLink = getTopicLink({ topic: tag.topicSlug, dark: true });

  return (
    <div className="block block__no-background articles-by-tag-3">
      <div className="articles-by-tag-3__combined-title-line articles-by-tag-3__title">
        {tagLink}
        {topicLink}
      </div>

      <div className="articles-by-tag-3__separate-header articles-by-tag-3__title">{tagLink}</div>

      <div className="articles-by-tag-3__cards">
        {articlesIds.map((id, index) => (
          <div key={id} className={`articles-by-tag-3__card-${index + 1}`}>
            <ArticleCard {...articles[id]} context={['articles-by-tag-3']} />
          </div>
        ))}
      </div>

      <div className="articles-by-tag-3__separate-footer articles-by-tag-3__title">{topicLink}</div>
    </div>
  );
};

ArticlesByTag3.propTypes = {
  block: PropTypes.shape({
    tagId: PropTypes.string.isRequired,
    articlesIds: IdsArray.isRequired,
  }).isRequired,
  data: PropTypes.shape({}).isRequired,
};

export default ArticlesByTag3;
