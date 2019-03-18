import React from 'react';
import PropTypes from 'prop-types';

import Icon from 'components/common/Icon';

import 'styles/src/kit/input/input.scss';

const Input = ({ pending, leftIcon, rightIcon }) => {
  return (
    <div className="wir-input search">
      <input type="text" />
      {pending && (
        <span className="wir-input__icon wir-input__icon-left wir-input__icon-loading">
          <Icon name="circle-notch" />
        </span>
      )}
      {leftIcon && (
        <span className="wir-input__icon wir-input__icon-left">
          <Icon name={leftIcon} />
        </span>
      )}
      {rightIcon && (
        <span className="wir-input__icon wir-input__icon-right">
          <Icon name={rightIcon} />
        </span>
      )}
      <span className="wir-input__bar" />
    </div>
  );
};

Input.propTypes = {
  pending: PropTypes.bool,
  leftIcon: PropTypes.string,
  rightIcon: PropTypes.string,
};

Input.defaultProps = {
  pending: false,
  leftIcon: null,
  rightIcon: null,
};

export default Input;
