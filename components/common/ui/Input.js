import React from 'react';
import PropTypes from 'prop-types';

import Icon from 'components/common/ui/Icon';

import 'styles/src/kit/input/input.scss';

const Input = ({ pending, leftIcon, rightIcon, disabled }) => (
  <div className="wir-input search">
    <input type="text" disabled={disabled} />
    {pending && (
      <span className="wir-input__icon wir-input__icon-left wir-input__icon-loading">
        <Icon name="circle-notch" />
      </span>
    )}
    {leftIcon && (
      <span className="wir-input__icon wir-input__icon-left">
        <Icon {...leftIcon} />
      </span>
    )}
    {rightIcon && (
      <span className="wir-input__icon wir-input__icon-right">
        <Icon {...rightIcon} />
      </span>
    )}
    <span className="wir-input__bar" />
  </div>
);

Input.propTypes = {
  pending: PropTypes.bool,
  disabled: PropTypes.bool,
  leftIcon: PropTypes.object,
  rightIcon: PropTypes.object,
  iconPack: PropTypes.string,
};

export default Input;
