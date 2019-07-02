import './tagsByTopic.scss';

import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import ScreenContext from 'components/common/layout/ScreenContext';
import TagCard from 'components/articles/cards/TagCard';

import { getTopicLink } from 'utils/tags';

import { TOPICS } from 'constants';
import { SCREENS } from 'constants/styles';

const { DESKTOP, MOBILE, TABLET, TABLET_LARGE, TOUCH } = SCREENS;

const CARD_SIZE_1 = {
  [DESKTOP]: 'l',
  [TABLET_LARGE]: 'square-m',
  [TABLET]: 'square-m',
  [MOBILE]: 'l',
};

const CARD_SIZE_2 = {
  [DESKTOP]: 's',
  [TABLET_LARGE]: 's-wide',
  [TABLET]: 'xs',
  [TOUCH]: 'ms',
  [MOBILE]: 'xs-wide',
};

const TagsByTopic = ({ block, data }) => {
  const { topicSlug, tagsIds, style } = block;
  const { tags } = data;
  const tagsData = tagsIds.map(id => tags[id]);
  const topicLink = getTopicLink({ topic: topicSlug });
  return (
    <div className="block block__no-background tags-by-topic">
      <div className="tags-by-topic__title-label">{topicLink}</div>
      <ScreenContext.Consumer>
        {({ screen }) => (
          <div className="tags-by-topic__cards">
            <div
              className={cn('tags-by-topic__2', {
                'tags-by-topic__2--pulled-right': style === '1-2',
              })}
            >
              <div className="tags-by-topic__2-top">
                <TagCard {...tagsData[0]} size={CARD_SIZE_2[screen]} />
              </div>
              <div className="tags-by-topic__2-bottom">
                <TagCard {...tagsData[1]} size={CARD_SIZE_2[screen]} />
              </div>
            </div>
            <div className="tags-by-topic__1">
              <TagCard {...tagsData[2]} size={CARD_SIZE_1[screen]} />
            </div>
          </div>
        )}
      </ScreenContext.Consumer>
    </div>
  );
};

TagsByTopic.propTypes = {
  block: PropTypes.shape({
    topicSlug: PropTypes.oneOf(TOPICS).isRequired,
    tagsIds: PropTypes.arrayOf(PropTypes.string).isRequired,
    style: PropTypes.oneOf(['1-2', '2-1']).isRequired,
  }).isRequired,
  data: PropTypes.shape({}).isRequired,
};

TagsByTopic.defaultProps = {};

export default TagsByTopic;
