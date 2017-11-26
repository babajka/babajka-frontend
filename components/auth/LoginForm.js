import React from 'react';
import PropTypes from 'prop-types';
import { Form, Text, Checkbox } from 'react-form';
import classNames from 'classnames';

import Button from 'components/common/Button';
import text from 'constants/dictionary';
import { isEmail, isEqual, required, checkLength } from 'utils/validators';

import FormField from './FormField';

const fields = {
  firstName: {
    label: text.firstName,
    icon: 'user',
    onlyOnSignUp: true,
    validator: ({ signUp, firstName }) => signUp && required(firstName),
  },
  lastName: {
    label: text.lastName,
    icon: 'user',
    onlyOnSignUp: true,
  },
  email: {
    label: text.email,
    icon: 'envelope',
    validator: ({ email }) => required(email) || isEmail(email),
  },
  password: {
    label: (
      <span>
        {text.password}
        <a className="is-pulled-right has-text-weight-normal login__input-forgot" href="/">
          {text.forgotPassword}
        </a>
      </span>
    ),
    icon: 'unlock-alt',
    inputType: 'password',
    validator: ({ signUp, password }) =>
      required(password) || (signUp && checkLength(password, 7, text.badPassword)),
  },
  passwordAgain: {
    label: text.passwordAgain,
    icon: 'unlock-alt',
    inputType: 'password',
    onlyOnSignUp: true,
    validator: ({ signUp, password, passwordAgain }) =>
      signUp &&
      (required(passwordAgain) || isEqual(password, passwordAgain, text.passwordsNotEqual)),
    successMessage: text.passwordsEqual,
  },
};

const errorValidator = values => {
  const errors = {};
  Object.keys(fields).forEach(key => {
    if (fields[key] && fields[key].validator) {
      errors[key] = fields[key].validator(values);
    }
  });
  return errors;
};

const keys = Object.keys(fields);
const errorsPropsTypes = {};
keys.forEach(field => {
  errorsPropsTypes[field] = PropTypes.string;
});

const hasErrors = errors => !!Object.values(errors).filter(Boolean).length;

const LoginForm = ({ onSubmit, pending, errors }) => {
  let serverErrors = { ...errors };
  return (
    <div>
      <h1 className="title is-size-5 has-text-centered">{text.sigInTitle}</h1>
      <Form onSubmit={onSubmit} validateError={errorValidator}>
        {formApi => {
          if (serverErrors) {
            Object.keys(fields).forEach(key => {
              formApi.setError(key, serverErrors[key]);
            });
            serverErrors = null;
          }
          return (
            <form onSubmit={formApi.submitForm}>
              <div className="field">
                <div className="control has-text-centered">
                  <label htmlFor="signUp" className="checkbox">
                    <Checkbox
                      id="signUp"
                      field="signUp"
                      onChange={formApi.setValue.bind(null, 'signUpMode')}
                    />
                    {text.noAccount}
                  </label>
                </div>
              </div>
              {keys
                .filter(key => formApi.values.signUpMode || !fields[key].onlyOnSignUp)
                .map(key => (
                  <FormField
                    key={key}
                    inputId={key}
                    label={fields[key].label}
                    icon={fields[key].icon}
                    pending={pending}
                    touched={!!formApi.touched[key]}
                    error={formApi.errors[key]}
                    successMessage={fields[key].successMessage}
                  >
                    {hasError => (
                      <Text
                        className={classNames('input', { 'is-danger': hasError })}
                        id={key}
                        field={key}
                        type={fields[key].inputType || 'text'}
                      />
                    )}
                  </FormField>
                ))}
              <div className="field">
                <div className="control has-text-centered">
                  <Button
                    disabled={hasErrors(formApi.errors)}
                    type="submit"
                    pending={pending}
                    onClick={formApi.submitForm}
                    className="button is-uppercase login__button"
                  >
                    {text.loginButton}
                  </Button>
                </div>
              </div>
            </form>
          );
        }}
      </Form>
    </div>
  );
};

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  pending: PropTypes.bool,
  errors: PropTypes.shape(errorsPropsTypes),
};

LoginForm.defaultProps = {
  errors: {},
  pending: false,
};

export default LoginForm;
