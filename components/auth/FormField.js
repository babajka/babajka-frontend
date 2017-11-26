import React from 'react';
import PropTypes from 'prop-types';

import Icon from 'components/common/Icon';

/* eslint-disable jsx-a11y/label-has-for */

const FormField = ({ inputId, label, icon, children, pending, touched, error, successMessage }) => {
  const hasError = !pending && touched && error;
  return (
    <div className="field">
      <label className="label login__input-text" htmlFor={inputId}>
        {label}
      </label>
      <div className="control has-icons-left">
        <span className="icon is-small">
          <Icon name={icon} />
        </span>
        {children(hasError)}
      </div>
      {hasError && <p className="help is-danger">{error}</p>}
      {touched && !error && <p className="help is-success">{successMessage}</p>}
    </div>
  );
};

FormField.propTypes = {
  inputId: PropTypes.string.isRequired,
  label: PropTypes.node.isRequired,
  icon: PropTypes.string.isRequired,
  children: PropTypes.func.isRequired,
  pending: PropTypes.bool,
  touched: PropTypes.bool.isRequired,
  error: PropTypes.string,
  successMessage: PropTypes.string,
};

FormField.defaultProps = {
  successMessage: null,
  pending: false,
  error: null,
};

export default FormField;
