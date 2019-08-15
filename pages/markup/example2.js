import 'components/articles/blocks/articlesByTag2.scss';

import pick from 'lodash/pick';

import React from 'react';

import TagPageBlockB from 'components/articles/blocks/TagPageBlockB';
import TagPageBlockCD from 'components/articles/blocks/TagPageBlockCD';

import DATA from './mocks';

const data = pick(DATA.data.articles, DATA.block.articlesIds);

export default () => {
  const articles = Object.values(data);
  return (
    <div>
      <TagPageBlockB articles={articles} layout="large-left" />{' '}
      <TagPageBlockB articles={articles} layout="large-right" />{' '}
      <TagPageBlockCD articles={articles} layout="row-of-two" />{' '}
      <TagPageBlockCD articles={articles} layout="row-of-three" />{' '}
    </div>
  );
};
