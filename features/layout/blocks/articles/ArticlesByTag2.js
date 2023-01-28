import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import bem from 'bem-css-modules';

import Text from 'components/common/Text';
import ArticleCard from 'features/layout/cards/article';

import { IdsArray } from 'utils/customPropTypes';
import { getTagLink, getTopicLink, getTagImageRenderer } from 'utils/features/tags';

import { TOPIC } from 'constants/misc';
import BlockWrapper from 'features/layout/blocks/wrapper';
import styles from './articlesByTag2.module.scss';

const b = bem(styles);

const ArticlesByTag2 = ({ block, data, inViewport }) => {
  const { tagId, articlesIds } = block;
  const { tags, articles } = data;
  const [first, second] = articlesIds.map(id => articles[id]);
  const tag = tags[tagId];
  const { topicSlug } = tag;
  const isBrand = topicSlug === TOPIC.brands;
  const tagLink = getTagLink({ tag, dark: true });
  const topicLink = getTopicLink({ topic: topicSlug, dark: true });

  return (
    <BlockWrapper className={b()} withBackground>
      <div className={b('labels', { right: isBrand })}>
        <div className={b('top-mobile-labels')}>
          {isBrand &&
            getTagImageRenderer({
              theme: 'dark',
              className: b('logo'),
              inViewport,
            })(tag)}
          <div className={b('label')}>
            <Text id={`topic.${topicSlug}_essentials`} />: {tagLink}
          </div>
        </div>
        <div className={cn(b('label'), b('bottom-desktop-label'))}>{topicLink}</div>
      </div>

      <div className={b('cards')}>
        <div className={b('card-1')}>
          <ArticleCard
            {...first}
            blockContext={['articles-by-tag-2']}
            inViewport={inViewport}
            onBackground
          />
        </div>

        <div className={b('card-2')}>
          <ArticleCard
            {...second}
            blockContext={['articles-by-tag-2']}
            inViewport={inViewport}
            onBackground
          />
        </div>
      </div>

      <div className={b('bottom-labels')}>
        <div className={cn(b('label'), b('bottom-mobile-label'))}>{topicLink}</div>
      </div>
    </BlockWrapper>
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
