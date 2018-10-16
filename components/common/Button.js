import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import noop from 'lodash/noop';

const Button = ({ className, pending, ...props }) => (
  <button type="button" className={cn(className, { 'is-loading': pending })} {...props} />
);

Button.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  pending: PropTypes.bool,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  onClick: noop,
  className: 'button is-success',
  pending: false,
  disabled: false,
};

export default Button;
