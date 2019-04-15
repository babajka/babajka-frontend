import React from 'react';
import { storiesOf } from '@storybook/react';
import { select, color, text, boolean, object } from '@storybook/addon-knobs';

import ArticleCard, { SIZES } from 'components/articles/cards/ArticleCard';

import { article } from 'styles/src/cards/defaultData';

const PREFIX = 'articles/cards';

const getCover = format =>
  `https://babajka.github.io/babajka-markup/static/images/mock/covers/article-${format}.png`;

const BRAND_TAG = {
  id: 'bla',
  slug: 'kurilka',
  content: {
    image:
      'https://res.cloudinary.com/wir-by/image/upload/v1541019686/dev/golden-data/references/kurilka.jpg',
    title: 'Курылка Гутэнберга',
  },
  topic: { id: 'bla-bla', slug: 'brands' },
};

const SAMPLE_COLLECTION = {
  articleIndex: 0,
  name: 'Міцкевіч: геаграфія паэта',
  imageUrl: 'https://babajka.github.io/babajka-markup/static/images/mock/persons/mickiewicz.png',
};

storiesOf(PREFIX).add('ArticleCard', () => {
  const size = select('size', SIZES, article.size);
  const title = text('title', article.title);
  const description = text('description', article.description);
  const author = text('author', article.author);
  const covers = object('covers', {
    page: '',
    horizontal: getCover('horizontal'),
    vertical: getCover('vertical'),
  });
  const theme = select('theme', ['dark', 'light'], article.isDarkTheme ? 'dark' : 'light');
  const bgColor = color('bgColor', article.backgroundColor);
  const isBrand = boolean('add brand tag', false);
  const isCollection = boolean('in collection', false);
  const props = { size, title, description, author, covers, theme, bgColor };
  if (isBrand) {
    props.tags = [BRAND_TAG];
  }
  if (isCollection) {
    props.collection = SAMPLE_COLLECTION;
  }
  return <ArticleCard {...props} />;
});
