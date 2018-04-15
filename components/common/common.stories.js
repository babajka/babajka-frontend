import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean, select, object } from '@storybook/addon-knobs';
import { withInfo } from '@storybook/addon-info';

import StoriesDecorator from './StoriesDecorator';
import CoreLayout from './layout/CoreLayout';
import LocaleContext from './LocaleContext';
import Button from './Button';
import Icon from './Icon';
import Select from './Select';
import Text from './Text';

const stories = storiesOf('common', module);

stories.add(
  'CoreLayout',
  withInfo({
    text:
      'This is the HOC that wraps provided components and import babajka styles, add page title and etc.',
    inline: true,
  })(() => {
    const ComponentToAddStyles = () => null;
    return (
      <CoreLayout title="Awesome page">
        <ComponentToAddStyles />
      </CoreLayout>
    );
  })
);

stories.addDecorator(withKnobs);
stories.addDecorator(StoriesDecorator);

stories.add('Button', () => {
  const withText = {
    onClick: action('WithText: onClick'),
    disabled: boolean('WithText: disabled', false),
    children: text('WithText: children', 'Click me!'),
    className: text('WithText: className', 'button is-primary'),
  };

  const withEmoji = {
    onClick: action('withEmoji: onClick'),
    disabled: boolean('withEmoji: disabled', true),
    children: text('withEmoji: children', '😀 😎 👍 💯'),
    className: text('withEmoji: className', 'button is-success'),
  };

  return (
    <ol style={{ margin: '5% 5% 0 5%' }}>
      <li>
        <h3>withText</h3>
        <Button {...withText}>{withText.children}</Button>
      </li>
      <br />
      <br />
      <li>
        <h3>withEmoji</h3>
        <Button {...withEmoji}>{withEmoji.children}</Button>
      </li>
    </ol>
  );
});

stories.add('Icon', () => {
  const name = text('fa name', 'github-alt');
  const size = select('fa size', ['', 'lg', '2x', '3x', '4x', '5x'], '5x');
  return <Icon name={name} size={size} />;
});

stories.add('Select', () => {
  const props = {
    valueWholeObject: boolean('valueWholeObject', false),
    options: object('options', [
      { id: 'apple', label: 'Apple' },
      { id: 'orange', label: 'Orange' },
      { id: 'carrot', label: 'Carrot' },
    ]),
    searchable: boolean('searchable', false),
    clerable: boolean('clerable', false),
    placeholder: text('placeholder', 'Select fruit...'),
    onChange: action('Select:'),
  };
  return (
    <ol style={{ margin: '5% 5% 0 5%' }}>
      <li>
        <h3>regular</h3>
        <Select {...props} />
      </li>
      <br />
      <br />
      <li>
        <h3>with custom renderOption</h3>
        <Select
          {...props}
          placeholder="Select author..."
          options={[
            {
              id: 1,
              label: 'Lavon Volski',
              photo: 'volski.jpg',
            },
            {
              id: 2,
              label: 'Вальжына Морт',
              photo: 'mort.jpg',
            },
            {
              id: 3,
              label: 'Вайцюшкевіч',
              photo: 'vajc.jpg',
            },
          ]}
          renderOption={({ label, photo }) => (
            <span className="user">
              <figure className="user-ava image is-32x32">
                <img src={`http://dev.wir.by/static/images/${photo}`} alt={label} />
              </figure>
              <span className="table-card-user__name">{label}</span>
            </span>
          )}
        />
      </li>
    </ol>
  );
});

stories.add(
  'Text',
  withInfo({
    text: 'Component to translate ui across the app.',
    inline: true,
  })(() => {
    const id = text('dict key', 'header.home');
    const lang = select('locale', ['be', 'ru', 'en'], 'be');
    return (
      <LocaleContext.Provider value={lang}>
        <ol style={{ margin: '5% 5% 0 5%' }}>
          <li>
            <h3>
              <b>default:</b>
            </h3>
            <Text id={id} />
          </li>
          <br />
          <br />
          <li>
            <h3>
              <b>with custom render:</b>
            </h3>
            <Text id={id} render={t => t.toUpperCase()} />
          </li>
        </ol>
      </LocaleContext.Provider>
    );
  })
);
