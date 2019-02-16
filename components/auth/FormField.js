import React from 'react';
import PropTypes from 'prop-types';
import { ErrorMessage } from 'formik';

import Icon from 'components/common/Icon';
import Text from 'components/common/Text';

const FormField = ({ id, label, icon, children, pending, touched, error, successText }) => {
  const hasError = !pending && touched && error;
  return (
    <div className="field">
      <label className="label login__input-text" htmlFor={id}>
        {label || <Text id={`auth.${id}`} />}
      </label>
      <div className="control has-icons-left">
        <span className="icon is-small">
          <Icon name={icon} />
        </span>
        {children(hasError)}
      </div>
      <ErrorMessage name={id}>
        {message => (
          <p className="help is-danger">
            <Text id={message} />
          </p>
        )}
      </ErrorMessage>
      {touched && !error && successText && (
        <p className="help is-success">
          <Text id={successText} />
        </p>
      )}
    </div>
  );
};

FormField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.node,
  icon: PropTypes.string.isRequired,
  children: PropTypes.func.isRequired,
  pending: PropTypes.bool,
  touched: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  successText: PropTypes.string,
};

FormField.defaultProps = {
  label: null,
  pending: false,
  touched: false,
  error: false,
  successText: '',
};

export default FormField;
