import './ui/button.scss';

import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import noop from 'lodash/noop';

const Button = ({ className, pending, icon, ...props }) => (
  <button
    type="button"
    className={cn('wir-button', className, {
      'wir-button__loading': pending,
      'wir-button__icon': icon,
    })}
    {...props}
  />
);

Button.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  pending: PropTypes.bool,
  disabled: PropTypes.bool,
  icon: PropTypes.bool,
};

Button.defaultProps = {
  onClick: noop,
  className: '',
  pending: false,
  disabled: false,
  icon: false,
};

export default Button;
