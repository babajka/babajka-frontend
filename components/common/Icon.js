import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

const Icon = ({ className, name, size, ...props }) => (
  <i className={cn(className, `fa fa-${name} fa-${size}`)} aria-hidden="true" {...props} />
);

Icon.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  size: PropTypes.string,
};

Icon.defaultProps = { className: '', size: '' };

export default Icon;
