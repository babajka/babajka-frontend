import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, object, select } from '@storybook/addon-knobs';

import StoriesDecorator from 'components/common/StoriesDecorator';

import LoginForm from './LoginForm';

const stories = storiesOf('auth', module);

stories.addDecorator(withKnobs);
stories.addDecorator(StoriesDecorator);

stories.add('LoginForm',
  () => {
    const props = {
      onSubmit: action('Submit form'),
      pending: boolean('Pending', false),
      signUpMode: boolean('Sign-up mode', false),
      errors: object('Errors', {
        email: 'З поштай нешта не так',
        password: 'Incorrect password.',
      }),
      successStatus: object('Success messages', {
        email: 'Карэктная пошта!',
        password: true,
        passwordAgain: 'Пароль падцверджаны!',
      }),
    };

    const mode = select('Mode', ['not touched', 'error', 'success']);
    if (mode !== 'error') {
      props.errors = {};
    }
    if (mode !== 'success') {
      props.successStatus = {};
    }

    return (
      <div className="login-page page-container">
        <div className="column is-4 is-offset-4">
          <LoginForm {...props} />
        </div>
      </div>
    );
  }
);
