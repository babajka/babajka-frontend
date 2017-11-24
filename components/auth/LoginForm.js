import React from 'react';
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
        <a className="is-pulled-right has-text-weight-normal login__input-forgot" href="/">
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
keys.forEach(field => {
  errorsPropsTypes[field] = PropTypes.string;
  successPropTypes[field] = PropTypes.oneOfType([PropTypes.string, PropTypes.bool]);
});

const LoginForm = ({ onSubmit, pending, errors, successStatus }) => (
  <div>
    <h1 className="title is-size-5 has-text-centered">Увайсці ў Вір</h1>
    <Form onSubmit={onSubmit}>
      {formApi => (
        <form onSubmit={formApi.submitForm}>
          <div className="field">
            <div className="control has-text-centered">
              <label htmlFor="signUp" className="checkbox">
                <Checkbox
                  id="signUp"
                  field="signUp"
                  onChange={formApi.setValue.bind(null, 'signUpMode')}
                />
                У мяне яшчэ няма акаўнта
              </label>
            </div>
          </div>
          {keys.filter(key => formApi.values.signUpMode || !fields[key].onlyOnSignUp).map(key => (
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
                onClick={formApi.submitForm}
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

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  pending: PropTypes.bool,
  errors: PropTypes.shape(errorsPropsTypes),
  successStatus: PropTypes.shape(successPropTypes),
};

LoginForm.defaultProps = {
  errors: {},
  successStatus: {},
  pending: false,
};

export default LoginForm;
