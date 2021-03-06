import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import bem from 'bem-css-modules';
import styles from './picture.module.scss';

const b = bem(styles);

// checkout `styles/responsiveness.scss`
const BREAKPOINTS = {
  mobile: { max: 499 },
  touch: { min: 500, max: 649 },
  tablet: { min: 650, max: 799 },
  'tablet-large': { min: 800, max: 1099 },
  desktop: { min: 1100 },
};

const getMedia = ({ min, max }) =>
  [min && `(min-width: ${min}px)`, max && `(max-width: ${max}px)`].filter(Boolean).join(' and ');

const Picture = ({ className, sources, alt, inViewport }) => (
  <picture className={cn(b(), className)}>
    {Object.entries(sources).map(([screen, src]) => (
      <source key={screen} media={getMedia(BREAKPOINTS[screen])} srcSet={src} />
    ))}
    <img src={sources.mobile} alt={alt} loading={inViewport ? 'eager' : 'lazy'} />
  </picture>
);

Picture.propTypes = {
  // screen: src map
  className: PropTypes.string,
  sources: PropTypes.objectOf(PropTypes.string).isRequired,
  alt: PropTypes.string.isRequired,
  inViewport: PropTypes.bool,
};

Picture.defaultProps = {
  className: '',
  inViewport: false,
};

export default Picture;
