import React from 'react';
import PropTypes from 'prop-types';

import TagCard from 'components/articles/cards/TagCard';

import { IdsArray, TagsById } from 'utils/customPropTypes';
import { getTopicLink } from 'utils/tags';

import { TOPICS } from 'constants';

import BlockWrapper from './BlockWrapper';

const TagsByTopic = ({ block, data: { tags } }) => {
  const { topicSlug, tagsIds, style } = block;
  const tagsData = tagsIds.map(id => tags[id]);
  const topicLink = getTopicLink({ topic: topicSlug });
  return (
    <BlockWrapper className={`tags-by-topic tags-by-topic--style-${style}`}>
      <div className="tags-by-topic__title-label">{topicLink}</div>
      <div className="tags-by-topic__cards">
        <div className="tags-by-topic__2">
          <div className="tags-by-topic__2-top">
            <TagCard {...tagsData[0]} />
          </div>
          <div className="tags-by-topic__2-bottom">
            <TagCard {...tagsData[1]} />
          </div>
        </div>
        <div className="tags-by-topic__1">
          <TagCard {...tagsData[2]} />
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
