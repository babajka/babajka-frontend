import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import imagePath from '../../images/photo5.jpg';
import { withInfo } from '@storybook/addon-info';

import Button from './Button';
import StyleLayout from './StyleLayout';
import ArticlePreview from '../articles/ArticlePreview';

const stories = storiesOf('common', module);

stories.add('StyleLayout',
  withInfo({
    text: 'This is the HOC that wraps provided components and import babajka styles',
    inline: true,
  })(
    () => {
      const ComponentToAddStyles = () => null;
      return (<StyleLayout><ComponentToAddStyles /></StyleLayout>);
    },
  ),
);

stories.addDecorator(withKnobs);
stories.addDecorator(getStory => (
  <StyleLayout>{getStory()}</StyleLayout>
));

stories.add('Button',
  () => {
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
          <Button {...withText} >{withText.children}</Button>
        </li>
        <br />
        <br />
        <li>
          <h3>withEmoji</h3>
          <Button {...withEmoji} >{withEmoji.children}</Button>
        </li>
      </ol>
    );
  },
);

stories.add('ArticlePreview',
	() => {
        const props = {
			imagePath: text('Image path', imagePath),
			articlePath: text('Article link', ''),
			title: text('Article title', 'Некоратка аб Ахматавай'),
			subtitle: text('Article subtitle', 'Настоящую нежность не спутаешь ни с чем...'),
			author: text('Article author', 'Зоя Тмац')
        };

        return (
            <ArticlePreview {...props}/>
        );
    }
);
