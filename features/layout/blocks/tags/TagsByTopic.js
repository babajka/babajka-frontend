import React from 'react';
import PropTypes from 'prop-types';
import bem from 'bem-css-modules';

import TagCard from 'features/layout/cards/tag';
import BlockWrapper from 'features/layout/blocks/wrapper';

import { IdsArray, TagsById } from 'utils/customPropTypes';
import { getTopicLink } from 'utils/features/tags';

import { TOPICS } from 'constants';

import styles from './tagsByTopic.module.scss';

const b = bem(styles);

const TagsByTopic = ({ block, data: { tags }, inViewport }) => {
  const { topicSlug, tagsIds, style } = block;
  const tagsData = tagsIds.map(id => tags[id]);
  const topicLink = getTopicLink({ topic: topicSlug });
  return (
    <BlockWrapper className={b({ style })}>
      <div className={b('title-label')}>{topicLink}</div>
      <div className={b('cards')}>
        <div className={b('2')}>
          <div className={b('2-top')}>
            <TagCard
              {...tagsData[0]}
              blockContext={[
                'tags-by-topic',
                `tags-by-topic--style--${style}`,
                'tags-by-topic__2',
                'tags-by-topic__2-top',
              ]}
              inViewport={inViewport}
            />
          </div>
          <div>
            <TagCard
              {...tagsData[1]}
              blockContext={[
                'tags-by-topic',
                `tags-by-topic--style--${style}`,
                'tags-by-topic__2',
                'tags-by-topic__2-bottom',
              ]}
              inViewport={inViewport}
            />
          </div>
        </div>
        <div className={b('1')}>
          <TagCard
            {...tagsData[2]}
            blockContext={['tags-by-topic', `tags-by-topic--style--${style}`, 'tags-by-topic__1']}
            inViewport={inViewport}
          />
        </div>
      </div>
    </BlockWrapper>
  );
};

TagsByTopic.propTypes = {
  block: PropTypes.shape({
    topicSlug: PropTypes.oneOf(TOPICS).isRequired,
    tagsIds: IdsArray.isRequired,
    style: PropTypes.oneOf(['1-2', '2-1']).isRequired,
  }).isRequired,
  data: PropTypes.shape({
    tags: TagsById.isRequired,
  }).isRequired,
};

TagsByTopic.defaultProps = {};

export default TagsByTopic;
