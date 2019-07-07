import React from 'react';
import PropTypes from 'prop-types';
import { ErrorMessage } from 'formik';

import Icon from 'components/common/ui/Icon';
import Text from 'components/common/Text';

const FormField = ({ id, label, icon, children, pending, touched, error }) => {
  const hasError = !pending && touched && error;
  return (
    <div className="login-form__input-wrap">
      <label className="login-form__input-label" htmlFor={id}>
        <Icon name={icon} /> {label || <Text id={`auth.${id}`} />}
      </label>
      {children(hasError)}
      <ErrorMessage name={id}>
        {message => (
          <p className="login-form__input-error-message">
            <Text id={message} />
          </p>
        )}
      </ErrorMessage>
      {/* {touched && !error && successText && (
        <p className="">
          <Text id={successText} />
        </p>
      )} */}
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
  // successText: PropTypes.string,
};

FormField.defaultProps = {
  label: null,
  pending: false,
  touched: false,
  error: false,
  // successText: '',
};

export default FormField;
