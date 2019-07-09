import './input.scss';

import React from 'react';
import PropTypes from 'prop-types';

import Clickable from 'components/common/Clickable';
import Icon from 'components/common/ui/Icon';

const getClass = (cls, err) => `${cls}${err ? ` ${cls}--error` : ''}`;

const Input = ({ pending, leftIcon, rightIcon, disabled, error, onRightClick, ...props }) => (
  <>
    <div className="wir-input">
      <input className="wir-input__input" type="text" disabled={disabled} {...props} />
      {pending && (
        <span className="wir-input__icon wir-input__icon--left wir-input__icon--loading">
          <Icon name="circle-notch" />
        </span>
      )}
      {leftIcon && (
        <span className={`${getClass('wir-input__icon', error)} wir-input__icon--left`}>
          <Icon {...leftIcon} />
        </span>
      )}
      {rightIcon && (
        <Clickable
          className={`${getClass('wir-input__icon', error)} wir-input__icon--right`}
          onClick={onRightClick}
        >
          <Icon {...rightIcon} />
        </Clickable>
      )}
      <span className={getClass('wir-input__bar', error)} />
    </div>
    {error && <p className="wir-input__error">{error}</p>}
  </>
);

Input.propTypes = {
  /* eslint-disable react/require-default-props */
  pending: PropTypes.bool,
  disabled: PropTypes.bool,
  leftIcon: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  rightIcon: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  iconPack: PropTypes.string,
  error: PropTypes.node,
  onRightClick: PropTypes.func,
  /* eslint-enable */
};

export default Input;
