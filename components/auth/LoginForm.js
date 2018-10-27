import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Form, Field } from 'formik';
import * as Yup from 'yup';
import { Router } from 'routes';

import { hasErrors } from 'utils/validators';
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
  },
  lastName: {
    isSignUpField: true,
    icon: 'user',
  },
  email: {
    icon: 'envelope',
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
    type: 'password',
  },
  passwordAgain: {
    isSignUpField: true,
    icon: 'unlock-alt',
    successText: 'auth.passwordsEqual',
    type: 'password',
  },
};

const loginFieldsKeys = Object.keys(loginFields);

const LoginSchema = Yup.object().shape({
  isSignUp: Yup.bool(),
  firstName: Yup.string().when(
    'isSignUp',
    (isSignUp, schema) => (isSignUp ? schema.required('forms.required') : schema)
  ),
  email: Yup.string()
    .required('forms.required')
    .email('auth.badEmail'),
  password: Yup.string()
    .required('forms.required')
    .when(
      'isSignUp',
      (isSignUp, schema) => (isSignUp ? schema.min(7, 'auth.badPassword') : schema)
    ),
  passwordAgain: Yup.string().when(
    'isSignUp',
    (isSignUp, schema) =>
      isSignUp
        ? schema.oneOf([Yup.required('forms.required').ref('password')], 'auth.passwordsNotEqual')
        : schema
  ),
});

const LoginForm = ({ next, allowSignUp }) => (
  <div>
    <h1 className="title is-size-5 has-text-centered">
      <Text id="auth.signIn" />
    </h1>
    <FormWrapper
      initialValues={LOGIN_INITIAL_FORM}
      validationSchema={LoginSchema}
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
