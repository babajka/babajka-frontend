import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, boolean, select, optionsKnob as options, object } from '@storybook/addon-knobs';

import Icon from 'components/common/ui/Icon';
import Input from 'components/common/ui/Input';

const PREFIX = 'common/ui';

storiesOf(PREFIX, module)
  .add('Icon', () => (
    <Icon
      pack={options('fa pack', { solid: 's', regular: 'r', brands: 'b' }, 'b', {
        display: 'inline-radio',
      })}
      name={text('fa name', 'github')}
      size={select('fa size', ['', 'lg', '2x', '3x', '4x', '5x'], '5x')}
    />
  ))
  .add('Input', () => (
    <Input
      pending={boolean('pending', true)}
      disabled={boolean('disabled', false)}
      leftIcon={object('leftIcon', { pack: 's', name: 'envelope' })}
      rightIcon={object('rightIcon', { pack: 's', name: 'arrow-right' })}
    />
  ));
