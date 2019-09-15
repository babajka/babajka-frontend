import './placeholder.scss';

import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

const Placeholder = ({ type, height, width, className, isInline }) => (
  <div
    className={cn(className, `placeholder-${type}`, { __inline: isInline })}
    style={{ height, width }}
  />
);

Placeholder.propTypes = {
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  className: PropTypes.string,
  isInline: PropTypes.bool,
  type: PropTypes.oneOf(['rect', 'round']),
};

Placeholder.defaultProps = {
  type: 'rect',
  className: '',
  isInline: false,
};

export default Placeholder;
