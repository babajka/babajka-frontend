import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';
import imagePath from 'static/images/mock/photo5.jpg';

import StoriesDecorator from 'components/common/StoriesDecorator';
import ArticlePreview from './ArticlePreview';

const stories = storiesOf('articles', module);

stories.addDecorator(withKnobs);
stories.addDecorator(StoriesDecorator);

stories.add('ArticlePreview', () => {
  const props = {
    className: text('className', 'is-5'),
    imageClassName: text('imageClassName', 'is-3by2'),
    title: text('title', 'Некоратка аб Ахматавай'),
    subtitle: text('subtitle', 'Настоящую нежность не спутаешь ни с чем...'),
    author: text('author', 'Зоя Тмац'),
    url: text('url', '#'),
    imagePath: text('image path', imagePath),
    articlePath: text('article link', ''),
  };

  return <ArticlePreview {...props} />;
});
