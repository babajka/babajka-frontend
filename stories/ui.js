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

// storiesOf(`${PREFIX}/Select`)
//   .add(
//     'default',
//     () => (
//       <Select
//         valueWholeObject={boolean('valueWholeObject', false)}
//         options={object('options', [
//           { id: 'apple', label: 'Apple' },
//           { id: 'orange', label: 'Orange' },
//           { id: 'carrot', label: 'Carrot' },
//         ])}
//         searchable={boolean('searchable', false)}
//         clerable={boolean('clerable', false)}
//         dropdown={boolean('dropdown', false)}
//         placeholder={text('placeholder', 'Select fruit...')}
//         size={select('size', ['xs', 's', 'm', 'l'], 's')}
//         onChange={action('Select')}
//       />
//     ),
//     {
//       info: `
//         Our custom select component
//         built with awesome [Downshift](https://github.com/paypal/downshift)!
//       `,
//     }
//   )
//   .addParameters(infoSource)
//   .add('dropdown', () => (
//     <Select
//       placeholder="Locale"
//       options={[{ id: 'be', label: 'Be' }, { id: 'en', label: 'En' }, { id: 'ru', label: 'Ru' }]}
//       onChange={action('Locale')}
//       dropdown
//       size="xs"
//     />
//   ))
//   .add('custom render', () => (
//     <Select
//       placeholder="Assign task to..."
//       options={[
//         { id: 'drapegnik', name: 'Ivan' },
//         { id: 'bohdan', name: 'Ulad' },
//         { id: 'drozd', name: 'Vika' },
//         { id: 'viarcinskaja', name: 'Tonya' },
//       ]}
//       renderOption={({ id, name }) => (
//         <Author
//           imageUrl={`https://res.cloudinary.com/wir-by/image/upload/v1528990359/production/team/${id}`}
//           name={name}
//         />
//       )}
//       onChange={action('Assigned to')}
//     />
//   ));
