import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Text } from 'react-form';

import Button from 'components/common/Button';
import FormControl from './FormControl';

const FIELDS = ['name', 'email', 'password', 'passwordAgain'];
const errorsPropsTypes = {};
const successPropTypes = {};
FIELDS.forEach((field) => {
  errorsPropsTypes[field] = PropTypes.string;
  successPropTypes[field] = PropTypes.oneOfType([PropTypes.string, PropTypes.bool]);
});

const errorValidator = ({ email }) => {
  return {
    email: email ? null : 'Input must contain Hello World'
  };
};

const inputs = {
  name: <Text className="input email-input" placeholder="Імя" />,
  email: <Text className="input email-input" placeholder="Пошта" />,
  password: <Text className="input password-input" type="password" placeholder="Пароль" />,
  passwordAgain: <Text className="input password-input" type="password" placeholder="Падцвердзіце пароль" />
};

class LoginForm extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    pending: PropTypes.bool,
    signUpMode: PropTypes.bool,
    errors: PropTypes.shape(errorsPropsTypes),
    successStatus: PropTypes.shape(successPropTypes),
  };

  static defaultProps = {
    errors: {},
    successStatus: {},
    pending: false,
    signUpMode: false,
  };

  render() {
    const { onSubmit, pending, signUpMode, errors, successStatus } = this.props;

    return (
      <Form onSubmit={onSubmit} validateError={errorValidator}>
        {formApi => (
          <form className="login-form" onSubmit={formApi.submitForm}>
            {signUpMode && (
              <FormControl
                icon="user"
                pending={pending}
                error={errors.name}
                success={successStatus.name}
              >
                <Text className="input email-input" field="name" placeholder="Імя" />
              </FormControl>
            )}

            <FormControl
              icon="envelope-o"
              pending={pending}
              error={errors.email || formApi.errors.email}
              success={successStatus.email}
            >
              <Text className="input email-input" field="email" placeholder="Пошта" />
            </FormControl>

            <FormControl
              icon="lock"
              pending={pending}
              error={errors.password}
              success={successStatus.password}
            >
              <Text
                className="input password-input"
                field="password"
                type="password"
                placeholder="Пароль"
              />
            </FormControl>

            {signUpMode && (
              <FormControl
                error={errors.passwordAgain}
                success={successStatus.passwordAgain}
              >
                <Text
                  className="input password-input"
                  field="passwordAgain"
                  type="password"
                  placeholder="Падцвердзіце пароль"
                />
              </FormControl>
            )}

            <p className="control login">
              <Button
                type="submit"
                onClick={onSubmit}
                className="button is-success is-outlined is-large is-fullwidth"
              >
                Паехалі
              </Button>
            </p>

            <div className="section forgot-password">
              <p className="has-text-centered">
                <a>Забылі пароль?</a>
                <a>Дапамога</a>
              </p>
            </div>
          </form>
        )}
      </Form>
    );
  }
}

export default LoginForm;
