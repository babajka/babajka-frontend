import React from 'react';
import PropTypes from 'prop-types';
import block from 'bem-css-modules';

import Clickable from 'components/common/Clickable';
import Icon from 'components/common/ui/Icon';
import styles from './input.module.scss';

const b = block(styles);

const Input = ({
  pending,
  leftIcon,
  rightIcon,
  disabled,
  error,
  onRightClick,
  placeholder,
  ...props
}) => (
  <>
    <div className={b()}>
      <input
        className={b('control')}
        type="text"
        disabled={disabled}
        placeholder={placeholder}
        aria-label={placeholder}
        {...props}
      />
      {pending && (
        <span className={b('icon', { left: true, loading: true })}>
          <Icon name="circle-notch" />
        </span>
      )}
      {leftIcon && (
        <span className={b('icon', { left: true, error })}>
          <Icon {...leftIcon} />
        </span>
      )}
      {rightIcon && (
        <Clickable className={b('icon', { right: true, error })} onClick={onRightClick}>
          <Icon {...rightIcon} />
        </Clickable>
      )}
      <span className={b('bar', { error })} />
    </div>
    {error && <p className={b('error')}>{error}</p>}
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
  placeholder: PropTypes.string,
  /* eslint-enable */
};

export default Input;
