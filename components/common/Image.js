import React from 'react';
import PropTypes from 'prop-types';

const Image = ({ className, sourceSizes, baseUrl, alt, title, sizes, mode }) => {
  const getSource = (w, x = 1) => `${baseUrl}?w=${w * x} ${mode === 'w' ? `${w * x}w` : `${x}x`},`;

  const srcSet = sourceSizes.reduce((acc, w) => `${acc}${getSource(w)}${getSource(w, 2)}`, '');
  return <img className={className} srcSet={srcSet} alt={alt} title={title} sizes={sizes} />;
};

Image.propTypes = {
  className: PropTypes.string,
  sourceSizes: PropTypes.arrayOf(PropTypes.number).isRequired,
  baseUrl: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  title: PropTypes.string,
  sizes: PropTypes.string,
  mode: PropTypes.oneOf(['w', 'x']),
};

Image.defaultProps = {
  className: '',
  sizes: '',
  mode: 'w',
  title: '',
};

export default Image;
