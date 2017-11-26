import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, object, select } from '@storybook/addon-knobs';

import StoriesDecorator from 'components/common/StoriesDecorator';

import LoginForm from './LoginForm';

const stories = storiesOf('auth', module);

stories.addDecorator(withKnobs);
stories.addDecorator(StoriesDecorator);

stories.add('LoginForm', () => {
  const props = {
    onSubmit: action('Submit form'),
    pending: boolean('Pending', false),
    errors: object('Backend errors', { email: 'Гэта пошта занята' }),
  };

  const mode = select('Mode', ['not touched', 'error', 'success']);
  if (mode !== 'error') {
    props.errors = {};
  }

  return (
    <div className="container login">
      <LoginForm {...props} />
    </div>
  );
});
