import React from 'react';
import PropTypes from 'prop-types';
import { ErrorMessage } from 'formik';
import bem from 'bem-css-modules';

import Icon from 'components/common/ui/Icon';
import Text from 'components/common/Text';
import styles from './login-form.module.scss';

const b = bem(styles);

const FormField = ({ id, label, icon, children, pending, touched, error }) => {
  const hasError = !pending && touched && error;
  return (
    <div className={b('input-wrap')}>
      <label className={b('input-label')} htmlFor={id}>
        <Icon name={icon} /> {label || <Text id={`auth.${id}`} />}
      </label>
      {children(hasError)}
      <ErrorMessage name={id}>
        {message => (
          <p className={b('input-error-message')}>
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
