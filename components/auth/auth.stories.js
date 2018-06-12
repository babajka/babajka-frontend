import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, text } from '@storybook/addon-knobs';
import cn from 'classnames';

import StoriesDecorator from 'components/common/StoriesDecorator';

import FormField from './FormField';

const stories = storiesOf('auth', module);

stories.addDecorator(withKnobs);
stories.addDecorator(StoriesDecorator);

stories.add('FormField', () => {
  const props = {
    icon: text('icon', 'github-alt'),
    pending: boolean('pending', false),
    touched: boolean('touched', false),
    error: text('error', 'auth.badPassword'),
    successMessage: text('successMessage', 'auth.passwordsEqual'),
  };

  return (
    <FormField inputId="password" {...props}>
      {hasError => <input id="password" className={cn('input', { 'is-danger': hasError })} />}
    </FormField>
  );
});
