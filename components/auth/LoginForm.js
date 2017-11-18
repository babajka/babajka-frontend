import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Text, Checkbox } from 'react-form';

import Button from 'components/common/Button';
import FormControl from './FormField';

const fields = {
  name: {
    label: 'Імя карыстальніка',
    icon: 'user',
    onlyOnSignUp: true,
  },
  email: {
    label: 'Пошта',
    icon: 'envelope',
  },
  password: {
    label: (
      <span>
        Пароль
        <a
          className="is-pulled-right has-text-weight-normal login__input-forgot"
          href=""
        >
          Забыліся на пароль?
        </a>
      </span>
    ),
    icon: 'unlock-alt',
    inputType: 'password',
  },
  passwordAgain: {
    label: 'Пацвердзіць пароль',
    icon: 'unlock-alt',
    inputType: 'password',
    onlyOnSignUp: true,
  },
};

const keys = Object.keys(fields);

const errorsPropsTypes = {};
const successPropTypes = {};
keys.forEach((field) => {
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
      <div>
        <h1 className="title is-size-5 has-text-centered">
          Увайсці ў Вір
        </h1>
        <Form onSubmit={onSubmit}>
          {formApi => (
            <form onSubmit={formApi.submitForm}>
              <div className="field">
                <div className="control has-text-centered">
                  <label htmlFor="mode" className="checkbox">
                    <Checkbox id="mode" field="mode" />
                    У мяне яшчэ няма акаўнта
                  </label>
                </div>
              </div>
              {keys
                .filter(key => signUpMode || !fields[key].onlyOnSignUp)
                .map(key => (
                  <FormControl
                    key={key}
                    inputId={key}
                    label={fields[key].label}
                    icon={fields[key].icon}
                    pending={pending}
                    error={errors[key]}
                    success={successStatus[key]}
                  >
                    <Text className="input" id={key} field={key} type={fields[key].inputType || 'text'} />
                  </FormControl>
                ))}
              <div className="field">
                <div className="control has-text-centered">
                  <Button
                    type="submit"
                    pending={pending}
                    onClick={onSubmit}
                    className="button is-uppercase login__button"
                  >
                    Паехалі!
                  </Button>
                </div>
              </div>
            </form>
          )}
        </Form>
      </div>
    );
  }
}

export default LoginForm;
