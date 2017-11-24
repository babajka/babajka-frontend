import React from 'react';
import PropTypes from 'prop-types';

import Icon from 'components/common/Icon';

/* eslint-disable jsx-a11y/label-has-for */

const FormField = ({ inputId, label, icon, children, pending, error, success }) => (
  <div className="field">
    <label className="label login__input-text" htmlFor={inputId}>
      {label}
    </label>
    <div className="control has-icons-left has-icons-right">
      {children}
      <span className="icon is-small">
        <Icon name={icon} />
      </span>
    </div>
    {!pending && error && <p className="help is-danger">{error}</p>}
    {!pending &&
      success &&
      typeof success === 'string' && <p className="help is-success">{success}</p>}
  </div>
);

FormField.propTypes = {
  inputId: PropTypes.string.isRequired,
  label: PropTypes.node.isRequired,
  icon: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  pending: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  error: PropTypes.any,
  success: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};

FormField.defaultProps = {
  success: true,
  pending: false,
  error: false,
};

export default FormField;
