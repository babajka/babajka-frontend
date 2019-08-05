import 'components/articles/blocks/articlesByTag2.scss';

import React from 'react';

import TagPageBlockB from 'components/articles/blocks/TagPageBlockB';
import TagPageBlockCD from 'components/articles/blocks/TagPageBlockCD';
import DATA from './mocks';

export default () => {
  return (
    <div>
      <TagPageBlockB {...{ ...DATA, style: 'large-left' }} />{' '}
      <TagPageBlockB {...{ ...DATA, style: 'large-right' }} />{' '}
      <TagPageBlockCD {...{ ...DATA, style: 'row-of-two' }} />{' '}
      <TagPageBlockCD {...{ ...DATA, style: 'row-of-three' }} />{' '}
    </div>
  );
};
