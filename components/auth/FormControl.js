import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Icon from 'components/common/Icon';

const FormControl = ({ icon, pending, children, error, success }) => {
  let iconName = icon;
  if (success) {
    iconName = 'check';
  }
  if (error) {
    iconName = 'warning';
  }

  return (
    <p
      className={classNames('control', {
        'has-icon has-icon-right': !!iconName,
        'is-loading': pending,
      })}
    >
      {children}
      {!pending && iconName && (
        <span
          className={classNames('icon', {
            user: !error,
            'is-right': error,
          })}
        >
          <Icon name={iconName} />
        </span>
      )}
      {!pending && error && (
        <span className="help is-danger">{error}</span>
      )}
      {!pending && success && (typeof success === 'string') && (
        <span className="help is-success">{success}</span>
      )}
    </p>
  );
};

FormControl.propTypes = {
  icon: PropTypes.string,
  pending: PropTypes.bool,
  children: PropTypes.node.isRequired,
  error: PropTypes.string,
  success: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};
FormControl.defaultProps = {
  pending: false,
};

export default FormControl;
