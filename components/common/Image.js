import React from 'react';
import PropTypes from 'prop-types';

const Image = ({
  className,
  sourceSizes,
  baseUrl,
  alt,
  title,
  sizes,
  mode,
  dimension,
  inViewport,
}) => {
  const getSource = (size, x = 1) =>
    `${baseUrl}?${dimension}=${size * x} ${mode === 'w' ? `${size * x}w` : `${x}x`},`;

  const srcSet = sourceSizes.reduce(
    (acc, size) => `${acc}${getSource(size)}${getSource(size, 2)}`,
    ''
  );
  return (
    <img
      className={className}
      srcSet={srcSet}
      alt={alt}
      title={title}
      sizes={sizes}
      loading={inViewport ? 'eager' : 'lazy'}
    />
  );
};

Image.propTypes = {
  className: PropTypes.string,
  sourceSizes: PropTypes.arrayOf(PropTypes.number).isRequired,
  baseUrl: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  title: PropTypes.string,
  sizes: PropTypes.string,
  mode: PropTypes.oneOf(['w', 'x']),
  dimension: PropTypes.oneOf(['w', 'h']),
  inViewport: PropTypes.bool,
};

Image.defaultProps = {
  className: '',
  sizes: '',
  mode: 'w',
  title: '',
  dimension: 'w',
  inViewport: false,
};

export default Image;
