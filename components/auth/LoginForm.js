import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from 'components/common/Button';
import FormControl from './FormControl';

const FIELDS = ['name', 'email', 'password', 'passwordAgain'];
const errorsPropsTypes = {};
const successPropTypes = {};
FIELDS.forEach((field) => {
  errorsPropsTypes[field] = PropTypes.string;
  successPropTypes[field] = PropTypes.oneOfType([PropTypes.string, PropTypes.bool]);
});

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
      <div className="login-form">
        {signUpMode && (
          <FormControl
            icon="user"
            pending={pending}
            error={errors.name}
            success={successStatus.name}
          >
            <input className="input email-input" type="text" placeholder="Імя" />
          </FormControl>
        )}

        <FormControl
          icon="envelope-o"
          pending={pending}
          error={errors.email}
          success={successStatus.email}
        >
          <input className="input email-input" type="text" placeholder="Пошта" />
        </FormControl>

        <FormControl
          icon="lock"
          pending={pending}
          error={errors.password}
          success={successStatus.password}
        >
          <input className="input password-input" type="password" placeholder="Пароль" />
        </FormControl>

        {signUpMode && (
          <FormControl
            error={errors.passwordAgain}
            success={successStatus.passwordAgain}
          >
            <input className="input password-input" type="password" placeholder="Падцвердзіце пароль" />
          </FormControl>
        )}

        <p className="control login">
          <Button
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
      </div>
    );
  }
}

export default LoginForm;
