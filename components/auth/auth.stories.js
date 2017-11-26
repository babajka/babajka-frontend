import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, text } from '@storybook/addon-knobs';
import classNames from 'classnames';

import StoriesDecorator from 'components/common/StoriesDecorator';

import FormField from './FormField';

const stories = storiesOf('auth', module);

stories.addDecorator(withKnobs);
stories.addDecorator(StoriesDecorator);

stories.add('FormField', () => {
  const props = {
    label: text('label', 'email'),
    icon: text('icon', 'github-alt'),
    pending: boolean('pending', false),
    touched: boolean('touched', false),
    error: text('error', 'invalid email'),
    successMessage: text('successMessage', 'correct email'),
  };

  return (
    <FormField inputId="email" {...props}>
      {hasError => <input id="email" className={classNames('input', { 'is-danger': hasError })} />}
    </FormField>
  );
});
