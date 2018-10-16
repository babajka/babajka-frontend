import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Form, Field } from 'formik';
import { Router } from 'routes';

import { isEmail, isEqual, required, checkLength, hasErrors } from 'utils/validators';
import FormWrapper from 'components/common/FormWrapper';
import Button from 'components/common/Button';
import Text from 'components/common/Text';

import { actions } from 'redux/ducks/auth';

import FormField from './FormField';

const LOGIN_INITIAL_FORM = {
  isSignUp: false,
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  passwordAgain: '',
};

const loginFields = {
  firstName: {
    isSignUpField: true,
    icon: 'user',
    validator: ({ isSignUp, firstName }) => isSignUp && required(firstName),
  },
  lastName: {
    isSignUpField: true,
    icon: 'user',
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
    validator: ({ isSignUp, password }) =>
      required(password) || (isSignUp && checkLength(password, 7, 'auth.badPassword')),
    type: 'password',
  },
  passwordAgain: {
    isSignUpField: true,
    icon: 'unlock-alt',
    validator: ({ isSignUp, password, passwordAgain }) =>
      isSignUp &&
      (required(passwordAgain) || isEqual(password, passwordAgain, 'auth.passwordsNotEqual')),
    successText: 'auth.passwordsEqual',
    type: 'password',
  },
};

const loginFieldsKeys = Object.keys(loginFields);

const loginValidator = values => {
  const errors = {};
  loginFieldsKeys.forEach(key => {
    if (loginFields[key] && loginFields[key].validator) {
      const error = loginFields[key].validator(values);
      if (error) {
        errors[key] = error;
      }
    }
  });
  return errors;
};

const LoginForm = ({ next, allowSignUp }) => (
  <div>
    <h1 className="title is-size-5 has-text-centered">
      <Text id="auth.signIn" />
    </h1>
    <FormWrapper
      initialValues={LOGIN_INITIAL_FORM}
      validate={loginValidator}
      action={actions.signIn}
      callback={() => Router.pushRoute(next)}
    >
      {({ values, errors, touched, isSubmitting }) => (
        <Form>
          {allowSignUp && (
            <div className="field">
              <div className="control has-text-centered">
                <label htmlFor="isSignUp" className="checkbox">
                  <Field id="isSignUp" name="isSignUp" type="checkbox" />
                  <Text id="auth.noAccount" />
                </label>
              </div>
            </div>
          )}
          {!allowSignUp && (
            <div className="signup-not-available">
              <Text id="auth.signup-not-available" />
            </div>
          )}
          {loginFieldsKeys
            .filter(key => values.isSignUp || !loginFields[key].isSignUpField)
            .map(key => {
              const { label, icon, successText, type } = loginFields[key];
              return (
                <FormField
                  key={key}
                  id={key}
                  label={label}
                  icon={icon}
                  pending={isSubmitting}
                  touched={touched[key]}
                  error={errors[key]}
                  successText={successText}
                >
                  {hasError => (
                    <Field
                      id={key}
                      className={cn('input', { 'is-danger': hasError })}
                      name={key}
                      type={type}
                    />
                  )}
                </FormField>
              );
            })}
          <div className="field">
            <div className="control has-text-centered">
              <Button
                className="button is-uppercase login__button"
                type="submit"
                disabled={hasErrors(errors, touched)}
                pending={isSubmitting}
              >
                <Text id="auth.submit" />
              </Button>
            </div>
          </div>
        </Form>
      )}
    </FormWrapper>
  </div>
);

LoginForm.propTypes = {
  next: PropTypes.string.isRequired,
  allowSignUp: PropTypes.bool.isRequired,
};

export default LoginForm;
