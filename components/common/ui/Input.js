import React from 'react';
import PropTypes from 'prop-types';
import bem from 'bem-css-modules';

import Clickable from 'components/common/Clickable';
import Icon from 'components/common/ui/Icon';
import Spinner from 'components/common/ui/Spinner';

import styles from './input.module.scss';

const b = bem(styles);

const Input = React.forwardRef(
  ({ pending, leftIcon, rightIcon, disabled, error, onRightClick, placeholder, ...props }, ref) => (
    <>
      <div className={b()}>
        <input
          ref={ref}
          className={b('control')}
          type="text"
          disabled={disabled}
          placeholder={placeholder}
          aria-label={placeholder}
          {...props}
        />
        {pending && (
          <span className={b('icon', { left: true })}>
            <Spinner />
          </span>
        )}
        {leftIcon && (
          <span className={b('icon', { left: true, error: !!error })}>
            <Icon {...leftIcon} />
          </span>
        )}
        {rightIcon && (
          <Clickable className={b('icon', { right: true, error: !!error })} onClick={onRightClick}>
            <Icon {...rightIcon} />
          </Clickable>
        )}
        <span className={b('bar', { error: !!error })} />
      </div>
      {error && <p className={b('error')}>{error}</p>}
    </>
  )
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
