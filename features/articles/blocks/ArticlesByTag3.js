import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import bem from 'bem-css-modules';

import ArticleCard from 'features/articles/cards/ArticleCard';

import { IdsArray } from 'utils/customPropTypes';
import { getTagLink, getTopicLink } from 'utils/features/tags';
import styles from './articlesByTag3.module.scss';

import BlockWrapper from './BlockWrapper';

const b = bem(styles);

const ArticlesByTag3 = ({ block, data }) => {
  const { tagId, articlesIds } = block;
  const { tags, articles } = data;
  const tag = tags[tagId];
  const tagLink = getTagLink({ tag, dark: true });
  const topicLink = getTopicLink({ topic: tag.topicSlug, dark: true });

  return (
    <BlockWrapper>
      <div className={cn(b('combined-title-line'), b('title'))}>
        {tagLink}
        {topicLink}
      </div>

      <div className={cn(b('separate-header'), b('title'))}>{tagLink}</div>

      <div className={b('cards')}>
        {articlesIds.map((id, index) => (
          <div key={id} className={b(`card-${index + 1}`)}>
            <ArticleCard {...articles[id]} blockContext={['articles-by-tag-3']} />
          </div>
        ))}
      </div>

      <div className={cn(b('separate-footer'), b('title'))}>{topicLink}</div>
    </BlockWrapper>
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
