import 'styles/src/cards/location.scss';
import 'styles/src/cards/person.scss';

import React from 'react';
import PropTypes from 'prop-types';

import { TopicShape } from 'utils/customPropTypes';

import CardWrapper, { SIZES } from './CardWrapper';

const TagCard = ({ topic, content, theme, size }) => {
  const dark = theme === 'dark';
  const wrapperProps = { size, dark };

  if (topic.slug === 'locations') {
    const { title, image } = content;
    return (
      <CardWrapper {...wrapperProps} bgImage={image} alt={title} className="location">
        <div className="location__title">{title}</div>
      </CardWrapper>
    );
  }

  if (topic.slug === 'personalities') {
    const { name, description, dates, color, image } = content;
    return (
      <CardWrapper {...wrapperProps} bgColor={color} className="person">
        {' '}
        <div className="person__cover-wrapper">
          <img className="person__cover" src={image} alt={name} title={name} />
        </div>
        <div className="person__content">
          <div className="person__years">{dates}</div>
          <div className="person__title">{name}</div>
          <div className="person__description">{description}</div>
        </div>
      </CardWrapper>
    );
  }
  return null;
};

TagCard.propTypes = {
  size: PropTypes.oneOf(SIZES).isRequired,
  theme: PropTypes.oneOf(['light', 'dark']),
  topic: TopicShape.isRequired,
  content: PropTypes.shape({
    title: PropTypes.string,
    name: PropTypes.string,
    image: PropTypes.string.isRequired,
    color: PropTypes.string,
  }).isRequired,
};

TagCard.defaultProps = {
  theme: 'light',
};

export default TagCard;
