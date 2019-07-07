import './login-form.scss';

import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Form, Field } from 'formik';
import { Router } from 'routes';

import { validEmail, required, checkLength, hasErrors } from 'utils/validators';
import FormWrapper from 'components/common/form/FormWrapper';
import Button from 'components/common/Button';
import Text from 'components/common/Text';
import Logo from 'assets/logo/Logo';

import { authActions } from 'redux/ducks/auth';

import FormField from './FormField';

const LOGIN_INITIAL_FORM = {
  isSignUp: false,
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  passwordAgain: '',
};

const LOGIN_FIELDS = [
  // {
  //   id: 'firstName',
  //   isSignUpField: true,
  //   icon: 'user',
  //   validator: ({ isSignUp, firstName }) => isSignUp && required(firstName),
  // },
  // {
  //   id: 'lastName',
  //   isSignUpField: true,
  //   icon: 'user',
  // },
  {
    id: 'email',
    icon: 'envelope',
    validator: ({ email }) => required(email) || validEmail(email),
  },
  {
    id: 'password',
    label: (
      <span>
        <Text id="auth.password" />
        {/* FIXME */}
        {/* <a className="is-pulled-right has-text-weight-normal login__input-forgot" href="/">
        <Text id="auth.forgotPassword" />
      </a> */}
      </span>
    ),
    icon: 'unlock-alt',
    validator: ({ isSignUp, password }) =>
      required(password) || (isSignUp && checkLength(password, 7, 'auth.badPassword')),
    type: 'password',
  },
  // {
  //   id: 'passwordAgain',
  //   isSignUpField: true,
  //   icon: 'unlock-alt',
  //   validator: ({ isSignUp, password, passwordAgain }) =>
  //     isSignUp &&
  //     (required(passwordAgain) || notEqual(password, passwordAgain, 'auth.passwordsNotEqual')),
  //   successText: 'auth.passwordsEqual',
  //   type: 'password',
  // },
];

const loginValidator = values =>
  LOGIN_FIELDS.reduce((acc, { id, validator = () => false }) => {
    const error = validator(values);
    if (error) {
      acc[id] = error;
    }
    return acc;
  }, {});

const LoginForm = ({ next }) => (
  <div className="login-form">
    <h2 className="login-form__title">
      <Text id="auth.signIn" />
    </h2>
    <div className="login-form__logo">
      <Logo size={50} />
    </div>
    <FormWrapper
      initialValues={LOGIN_INITIAL_FORM}
      validate={loginValidator}
      action={authActions.signIn}
      onSuccess={() => Router.pushRoute(next)}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form>
          {/* <div className="field">
              <div className="control has-text-centered">
                <label htmlFor="isSignUp" className="checkbox">
                  <Field id="isSignUp" name="isSignUp" type="checkbox" />
                  <Text id="auth.noAccount" />
                </label>
              </div>
            </div> */}
          {LOGIN_FIELDS
            // .filter(({ isSignUpField }) => values.isSignUp || isSignUpField)
            .map(({ id, label, icon, successText, type }) => (
              <FormField
                key={id}
                id={id}
                label={label}
                icon={icon}
                pending={isSubmitting}
                touched={touched[id]}
                error={errors[id]}
                successText={successText}
              >
                {hasError => (
                  <Field
                    id={id}
                    className={cn('login-form__input', { 'login-form__input-error': hasError })}
                    name={id}
                    type={type}
                  />
                )}
              </FormField>
            ))}
          <div className="login-form__btn-container">
            <div className="login-form__btn-wrap">
              <Button
                className="login-form__btn"
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
};

export default LoginForm;
