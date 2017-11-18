import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Button = ({ children, className, pending, ...otherProps }) => (
  <button
    className={classNames(className, { 'is-loading': pending })}
    {...otherProps}
  >
    {children}
  </button>
);

Button.propTypes = {
  className: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  pending: PropTypes.bool,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  pending: false,
  disabled: false,
  className: 'button is-success',
};

export default Button;
