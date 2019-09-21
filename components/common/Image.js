import React from 'react';
import PropTypes from 'prop-types';

const Image = ({ sources, alt, sizes }) => {
  const srcSet = Object.entries(sources).reduce(
    (acc, [size, link]) => `${acc}${link} ${size}w,`,
    ''
  );
  return <img srcSet={srcSet} alt={alt} sizes={sizes} />;
};

Image.propTypes = {
  sources: PropTypes.objectOf(PropTypes.string).isRequired,
  alt: PropTypes.string.isRequired,
  sizes: PropTypes.string,
};

Image.defaultProps = {
  sizes: '',
};

export default Image;
