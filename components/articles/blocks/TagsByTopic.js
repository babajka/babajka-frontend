import './tagsByTopic.scss';

import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import TagCard from 'components/articles/cards/TagCard';

import { IdsArray } from 'utils/customPropTypes';
import { getTopicLink } from 'utils/tags';

import { TOPICS } from 'constants';

const TagsByTopic = ({ block, data }) => {
  const { topicSlug, tagsIds, style } = block;
  const { tags } = data;
  const tagsData = tagsIds.map(id => tags[id]);
  const topicLink = getTopicLink({ topic: topicSlug });
  return (
    <div className="block block__no-background tags-by-topic">
      <div className="tags-by-topic__title-label">{topicLink}</div>
      <div className="tags-by-topic__cards">
        <div
          className={cn('tags-by-topic__2', {
            'tags-by-topic__2--pulled-right': style === '1-2',
          })}
        >
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
    </div>
  );
};

TagsByTopic.propTypes = {
  block: PropTypes.shape({
    topicSlug: PropTypes.oneOf(TOPICS).isRequired,
    tagsIds: IdsArray.isRequired,
    style: PropTypes.oneOf(['1-2', '2-1']).isRequired,
  }).isRequired,
  data: PropTypes.shape({}).isRequired,
};

TagsByTopic.defaultProps = {};

export default TagsByTopic;