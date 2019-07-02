import './articlesByTag2.scss';

import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import Text from 'components/common/Text';
import ArticleCard from 'components/articles/cards/ArticleCard';

import { IdsArray } from 'utils/customPropTypes';
import { getTagLink, getTopicLink } from 'utils/tags';

import { TOPIC } from 'constants/misc';

// const { DESKTOP, MOBILE, TABLET, TABLET_LARGE, TOUCH } = SCREENS;

// const CARD_SIZE = {
//   [DESKTOP]: 'square-m',
//   [TABLET_LARGE]: 'l',
//   [TABLET]: 'square-m',
//   [TOUCH]: 'm',
//   [MOBILE]: 'square-s',
// };

const ArticlesByTag2 = ({ block, data }) => {
  const { tagId, articlesIds } = block;
  const { tags, articles } = data;
  const [first, second] = articlesIds.map(id => articles[id]);
  const tag = tags[tagId];
  const { topic, content } = tag;
  const isBrand = topic.slug === TOPIC.brand;
  const tagLink = getTagLink({ tag, dark: true });
  const topicLink = getTopicLink({ topic: topic.slug, dark: true });

  return (
    <div className="block block__with-background articles-by-tag-2">
      <div
        className={cn('articles-by-tag-2__labels', {
          'articles-by-tag-2__labels--right': isBrand,
        })}
      >
        <div className="articles-by-tag-2__top-mobile-labels">
          {isBrand && <img src={content.image} alt={content.title} width="120" />}
          <div className="articles-by-tag-2__label">
            <Text id={`topic.${topic.slug}_essentials`} />:{tagLink}
          </div>
        </div>
        <div className="articles-by-tag-2__label articles-by-tag-2__bottom-desktop-label">
          {topicLink}
        </div>
      </div>

      <div className="articles-by-tag-2__cards">
        <div className="articles-by-tag-2__card-1">
          <ArticleCard {...first} size="media-query" />
        </div>

        <div className="articles-by-tag-2__card-2">
          <ArticleCard {...second} size="media-query" />
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
