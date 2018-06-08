import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Icon = ({ className, name, size, ...props }) => (
  <i className={classNames(className, `fa fa-${name} fa-${size}`)} aria-hidden="true" {...props} />
);

Icon.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  size: PropTypes.string,
};

Icon.defaultProps = { className: '', size: '' };

export default Icon;
