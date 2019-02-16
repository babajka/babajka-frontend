import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { text, boolean, select, object } from '@storybook/addon-knobs';

import Icon from 'components/common/Icon';
import Text from 'components/common/Text';
import Button from 'components/common/Button';
import Select from 'components/common/Select';
import LocaleContext from 'components/common/LocaleContext';
import CoreLayout from 'components/common/layout/CoreLayout';
import Author from 'components/articles/EditArticleForm/Author';

import { infoSource } from './utils/params';

const PREFIX = 'Common';
const stories = storiesOf(PREFIX, module);

stories.add(
  'CoreLayout',
  () => {
    const SomePage = () => null;
    return (
      <CoreLayout title="header.main" path="">
        <SomePage />
      </CoreLayout>
    );
  },
  {
    info: `
      This is the root component
      that wraps provided components
      and import babajka styles,
      add page title and etc.
    `,
  }
);

stories.add('Icon', () => (
  <Icon
    name={text('fa name', 'github-alt')}
    size={select('fa size', ['', 'lg', '2x', '3x', '4x', '5x'], '5x')}
  />
));

storiesOf(`${PREFIX}/Button`, module)
  .add('default', () => (
    <Button
      className={text('className', 'button is-primary')}
      onClick={action('onClick')}
      disabled={boolean('disabled', false)}
      pending={boolean('pending', false)}
    >
      {text('children', 'Hello Button')}
    </Button>
  ))
  .addParameters(infoSource)
  .add('colors', () => {
    const colors = ['', 'primary', 'link', 'info', 'success', 'warning', 'danger'];
    return (
      <div className="column">
        {colors.map(color => (
          <div className="field">
            <Button className={`button is-${color}`}>{color || 'none'}</Button>
          </div>
        ))}
      </div>
    );
  });

storiesOf(`${PREFIX}/Select`)
  .add(
    'default',
    () => (
      <Select
        valueWholeObject={boolean('valueWholeObject', false)}
        options={object('options', [
          { id: 'apple', label: 'Apple' },
          { id: 'orange', label: 'Orange' },
          { id: 'carrot', label: 'Carrot' },
        ])}
        searchable={boolean('searchable', false)}
        clerable={boolean('clerable', false)}
        dropdown={boolean('dropdown', false)}
        placeholder={text('placeholder', 'Select fruit...')}
        size={select('size', ['xs', 's', 'm', 'l'], 's')}
        onChange={action('Select')}
      />
    ),
    {
      info: `
        Our custom select component
        built with awesome [Downshift](https://github.com/paypal/downshift)!
      `,
    }
  )
  .addParameters(infoSource)
  .add('dropdown', () => (
    <Select
      placeholder="Locale"
      options={[{ id: 'be', label: 'Be' }, { id: 'en', label: 'En' }, { id: 'ru', label: 'Ru' }]}
      onChange={action('Locale')}
      dropdown
      size="xs"
    />
  ))
  .add('custom render', () => (
    <Select
      placeholder="Assign task to..."
      options={[
        { id: 'drapegnik', name: 'Ivan' },
        { id: 'bohdan', name: 'Ulad' },
        { id: 'drozd', name: 'Vika' },
        { id: 'viarcinskaja', name: 'Tonya' },
      ]}
      renderOption={({ id, name }) => (
        <Author
          imageUrl={`https://res.cloudinary.com/wir-by/image/upload/v1528990359/production/team/${id}`}
          name={name}
        />
      )}
      onChange={action('Assigned to')}
    />
  ));

storiesOf(`${PREFIX}/Text`, module)
  .addDecorator(story => {
    const lang = select('locale', ['be', 'ru', 'en'], 'be');
    return <LocaleContext.Provider value={lang}>{story()}</LocaleContext.Provider>;
  })
  .add('default', () => <Text id={text('dict key', 'about.goal')} />, {
    info: `
      Our internationalization helper,
      that use translations from [Google Sheet](https://docs.google.com/spreadsheets/d/1b3Or9-t_pDZq6GOL4MRUbFhoXuteVxCrRHTM17DLALg/edit?usp=sharing)
    `,
  })
  .addParameters(infoSource)
  .add('custom render', () => <Text id="about.join-us" render={t => t.toUpperCase()} />)
  .add('with separator', () => (
    <ol>
      <h3 className="title is-5">
        You can cut translation with `||` symbols, and receive it by parts:
      </h3>
      <Text
        id="about.contact"
        render={(...parts) =>
          parts.map(t => (
            <li key={t}>
              {t}
              <br />
            </li>
          ))
        }
      />
    </ol>
  ));
