import './location.scss';
import './person.scss';

import React from 'react';
import PropTypes from 'prop-types';

import { TopicSlug, ThemeType } from 'utils/customPropTypes';
import { ROUTES_NAMES } from 'routes';
import { TOPIC } from 'constants/misc';

import Image from 'components/common/Image';

import CardWrapper, { SIZES } from './CardWrapper';

const TagCard = ({ slug, topicSlug, content, size }) => {
  const wrapperProps = {
    size,
    linkProps: {
      route: ROUTES_NAMES.tag,
      params: {
        topic: topicSlug,
        tag: slug,
      },
    },
  };

  if (topicSlug === TOPIC.locations) {
    const { title, image, theme, color } = content;
    return (
      <CardWrapper
        {...wrapperProps}
        image={image}
        theme={theme}
        color={color}
        alt={title}
        className="location"
      >
        <div className="location__title">{title}</div>
      </CardWrapper>
    );
  }

  if (topicSlug === TOPIC.personalities) {
    const { name, description, subtitle, image, theme, color } = content;
    return (
      <CardWrapper {...wrapperProps} theme={theme} color={color} className="person">
        {' '}
        <div className="person__cover-container">
          {image && (
            <Image
              className="person__cover"
              alt={name}
              title={name}
              sourceSizes={[390]}
              baseUrl={image}
              mode="x"
            />
          )}
        </div>
        <div className="person__content">
          <div className="person__subtitle">{subtitle}</div>
          <div className="person__title">{name}</div>
          <div className="person__description">{description}</div>
        </div>
      </CardWrapper>
    );
  }
  return null;
};

TagCard.propTypes = {
  slug: PropTypes.string.isRequired,
  size: PropTypes.oneOf(SIZES),
  topicSlug: TopicSlug.isRequired,
  content: PropTypes.shape({
    title: PropTypes.string,
    subtitle: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string.isRequired,
    color: PropTypes.string,
    theme: ThemeType,
  }).isRequired,
};

TagCard.defaultProps = {
  size: 'auto',
};

export default TagCard;
