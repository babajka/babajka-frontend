import React from 'react';
import PropTypes from 'prop-types';

const Image = ({ className, sourceSizes, baseUrl, alt, sizes }) => {
  const getSource = w => `${baseUrl}?w=${w} ${w}w,`;

  const srcSet = sourceSizes.reduce((acc, w) => `${acc}${getSource(w)}${getSource(w * 2)}`, '');
  return <img className={className} srcSet={srcSet} alt={alt} sizes={sizes} />;
};

Image.propTypes = {
  className: PropTypes.string,
  sourceSizes: PropTypes.arrayOf(PropTypes.number).isRequired,
  baseUrl: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  sizes: PropTypes.string,
};

Image.defaultProps = {
  className: '',
  sizes: '',
};

export default Image;
