import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ children, ...otherProps }) => (
  <button {...otherProps}>{children}</button>
);

Button.propTypes = {
  className: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool.isRequired,
};

Button.defaultProps = {
  disabled: false,
  className: 'button is-success',
};

export default Button;
