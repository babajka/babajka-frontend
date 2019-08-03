import 'components/articles/blocks/articlesByTag2.scss';

import React from 'react';

import TagPageBlockB from 'components/articles/blocks/TagPageBlockB';
import DATA from './mocks';

export default () => <TagPageBlockB {...{ ...DATA, style: 'B1' }} />;
