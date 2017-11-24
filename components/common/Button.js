import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Button = ({ children, className, pending, ...otherProps }) => (
  <button className={classNames(className, { 'is-loading': pending })} {...otherProps}>
    {children}
  </button>
);

Button.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  pending: PropTypes.bool,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  className: 'button is-success',
  pending: false,
  disabled: false,
};

export default Button;
