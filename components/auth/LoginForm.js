import React from 'react';
import PropTypes from 'prop-types';
import { Form, Text as TextField, Checkbox } from 'react-form';
import classNames from 'classnames';

import Button from 'components/common/Button';
import { isEmail, isEqual, required, checkLength, hasErrors } from 'utils/validators';
import Text from 'components/common/Text';

import FormField from './FormField';

const fields = {
  firstName: {
    icon: 'user',
    onlyOnSignUp: true,
    validator: ({ signUp, firstName }) => signUp && required(firstName),
  },
  lastName: {
    icon: 'user',
    onlyOnSignUp: true,
  },
  email: {
    icon: 'envelope',
    validator: ({ email }) => required(email) || isEmail(email),
  },
  password: {
    label: (
      <span>
        <Text id="auth.password" />
        {false && ( // TODO(@drapegnik): implement
          <a className="is-pulled-right has-text-weight-normal login__input-forgot" href="/">
            <Text id="auth.forgotPassword" />
          </a>
        )}
      </span>
    ),
    icon: 'unlock-alt',
    inputType: 'password',
    validator: ({ signUp, password }) =>
      required(password) || (signUp && checkLength(password, 7, 'auth.badPassword')),
  },
  passwordAgain: {
    icon: 'unlock-alt',
    inputType: 'password',
    onlyOnSignUp: true,
    validator: ({ signUp, password, passwordAgain }) =>
      signUp &&
      (required(passwordAgain) || isEqual(password, passwordAgain, 'auth.passwordsNotEqual')),
    successMessage: 'auth.passwordsEqual',
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

const LoginForm = ({ onSubmit, pending, errors }) => {
  let serverErrors = { ...errors };

  const handleModeSwitch = (formApi, value) => {
    const clearTouch = {};
    formApi.setValue('signUp', value);
    Object.keys(fields).forEach(field => {
      if (!formApi.values[field]) {
        clearTouch[field] = false;
      }
    });
    formApi.setAllTouched(clearTouch);
  };

  return (
    <div>
      <h1 className="title is-size-5 has-text-centered">
        <Text id="auth.signIn" />
      </h1>
      <Form onSubmit={onSubmit} validateError={errorValidator}>
        {formApi => {
          // FIXME(@drapegnik): find more clean way to handle server-side errors
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
                      onChange={handleModeSwitch.bind(null, formApi)}
                    />
                    <Text id="auth.noAccount" />
                  </label>
                </div>
              </div>
              {keys.filter(key => formApi.values.signUp || !fields[key].onlyOnSignUp).map(key => (
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
                    <TextField
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
                    <Text id="auth.submit" />
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
