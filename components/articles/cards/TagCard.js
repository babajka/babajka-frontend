import './location.scss';
import './person.scss';

import React from 'react';
import PropTypes from 'prop-types';

import { TopicShape } from 'utils/customPropTypes';
import { ROUTES_NAMES } from 'routes';

import CardWrapper, { SIZES } from './CardWrapper';

const TagCard = ({ slug, topic, content, theme, size }) => {
  const dark = theme === 'dark';
  const wrapperProps = {
    size,
    dark,
    linkProps: {
      route: ROUTES_NAMES.tag,
      params: {
        topic: topic.slug,
        tag: slug,
      },
    },
  };

  if (topic.slug === 'locations') {
    const { title, image } = content;
    return (
      <CardWrapper {...wrapperProps} image={image} alt={title} className="location">
        <div className="location__title">{title}</div>
      </CardWrapper>
    );
  }

  if (topic.slug === 'personalities') {
    const { name, description, subtitle, color, image } = content;
    return (
      <CardWrapper {...wrapperProps} color={color} className="person">
        {' '}
        <div className="person__cover-wrapper">
          <img className="person__cover" src={image} alt={name} title={name} />
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
  theme: PropTypes.oneOf(['light', 'dark']),
  topic: TopicShape.isRequired,
  content: PropTypes.shape({
    title: PropTypes.string,
    subtitle: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string.isRequired,
    color: PropTypes.string,
  }).isRequired,
};

TagCard.defaultProps = {
  size: 'auto',
  theme: 'light',
};

export default TagCard;
