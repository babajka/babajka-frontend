import './articlesByTag2.scss';

import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import Text from 'components/common/Text';
import ArticleCard from 'components/articles/cards/ArticleCard';

import { IdsArray } from 'utils/customPropTypes';
import { getTagLink, getTopicLink, getTagImageRenderer } from 'utils/tags';

import { TOPIC } from 'constants/misc';

const ArticlesByTag2 = ({ block, data }) => {
  const { tagId, articlesIds } = block;
  const { tags, articles } = data;
  const [first, second] = articlesIds.map(id => articles[id]);
  const tag = tags[tagId];
  const { topicSlug } = tag;
  const isBrand = topicSlug === TOPIC.brands;
  const tagLink = getTagLink({ tag, dark: true });
  const topicLink = getTopicLink({ topic: topicSlug, dark: true });

  return (
    <div className="block block__with-background articles-by-tag-2">
      <div
        className={cn('articles-by-tag-2__labels', {
          'articles-by-tag-2__labels--right': isBrand,
        })}
      >
        <div className="articles-by-tag-2__top-mobile-labels">
          {isBrand &&
            getTagImageRenderer({
              theme: 'dark',
              className: 'articles-by-tag-2__logo',
            })(tag)}
          <div className="articles-by-tag-2__label">
            <Text id={`topic.${topicSlug}_essentials`} />: {tagLink}
          </div>
        </div>
        <div className="articles-by-tag-2__label articles-by-tag-2__bottom-desktop-label">
          {topicLink}
        </div>
      </div>

      <div className="articles-by-tag-2__cards">
        <div className="articles-by-tag-2__card-1">
          <ArticleCard {...first} context={['articles-by-tag-2']} />
        </div>

        <div className="articles-by-tag-2__card-2">
          <ArticleCard {...second} context={['articles-by-tag-2']} />
        </div>
      </div>

      <div className="articles-by-tag-2__bottom-labels">
        <div className="articles-by-tag-2__label articles-by-tag-2__bottom-mobile-label">
          {topicLink}
        </div>
      </div>
    </div>
  );
};

ArticlesByTag2.propTypes = {
  block: PropTypes.shape({
    tagId: PropTypes.string.isRequired,
    articlesIds: IdsArray.isRequired,
  }).isRequired,
  data: PropTypes.shape({}).isRequired,
};

export default ArticlesByTag2;
