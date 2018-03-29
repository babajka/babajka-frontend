import React from 'react';

import 'babajka-markup/dist/styles/assets.min.css';
import 'babajka-markup/dist/styles/bundle.min.css';

import { CoreLayout } from './CoreLayout';

export default getStory => (
  <CoreLayout>
    <div style={{ margin: '5%' }}>{getStory()}</div>
  </CoreLayout>
);
