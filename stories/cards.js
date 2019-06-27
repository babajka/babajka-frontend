import React from 'react';
import { storiesOf } from '@storybook/react';
import { select, color, text, boolean, object, radios } from '@storybook/addon-knobs';

import { SIZES } from 'components/articles/cards/CardWrapper';
import ArticleCard from 'components/articles/cards/ArticleCard';
import TagCard from 'components/articles/cards/TagCard';

import { article, person, location } from './defaultData';

const PREFIX = 'articles/cards';

const getCover = format =>
  `https://babajka.github.io/babajka-markup/static/images/mock/covers/article-${format}.png`;

const BRAND_TAG = {
  slug: 'art-museum',
  content: {
    image: 'https://babajka.github.io/babajka-markup/static/images/mock/brands/art-museum.png',
    title: 'Нацыянальны Мастацкі Музей',
  },
  topic: { slug: 'brands' },
};

const SAMPLE_COLLECTION = {
  articleIndex: 0,
  name: 'Міцкевіч: геаграфія паэта',
  imageUrl: 'https://babajka.github.io/babajka-markup/static/images/mock/persons/mickiewicz.png',
};

storiesOf(PREFIX)
  .add('ArticleCard', () => {
    const size = select('size', SIZES, article.size);
    const type = radios('type', ['text', 'video'], 'text');
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
    const inCollection = boolean('in collection', false);
    const props = { size, title, description, author, covers, theme, bgColor, type };
    if (inCollection) {
      props.collection = SAMPLE_COLLECTION;
    }
    if (isBrand) {
      props.tags = [BRAND_TAG];
    }
    return <ArticleCard {...props} />;
  })
  .add('TagCard', () => {
    const size = select('size', SIZES, person.size);
    const topicType = radios('topic', ['locations', 'personalities'], 'personalities');
    const topic = { slug: topicType };

    // location
    const title = text('location title', location.title);
    const image = text('location image', location.image);
    const locationContent = { title, image };

    // person
    const name = text('person name', person.title);
    const description = text('person description', person.description);
    const dates = text('person dates', person.years);
    const pColor = color('person color', person.backgroundColor);
    const pImage = text('person image', person.image);
    const personContent = { name, description, dates, color: pColor, image: pImage };

    const props = {
      size,
      theme: topicType === 'locations' ? 'dark' : 'light',
      topic,
      content: topicType === 'locations' ? locationContent : personContent,
    };
    return <TagCard {...props} />;
  });
