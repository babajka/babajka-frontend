import { configure, addDecorator } from '@storybook/react';
import { setDefaults } from '@storybook/addon-info';
import { withKnobs } from '@storybook/addon-knobs';

import StoriesDecorator from 'stories/utils/StoriesDecorator';

const req = require.context('../stories', true, /.js$/);

function loadStories() {
  req.keys().forEach(req);
}

addDecorator(withKnobs);
addDecorator(StoriesDecorator);
setDefaults({
  inline: true,
  styles: {
    header: {
      h1: {
        margin: 0,
        padding: 0,
        fontSize: '25px',
        color: '#1a9582',
      },
      h2: {
        margin: 0,
        padding: 0,
        fontSize: '16px',
      },
      body: {
        padding: 0,
        margin: 0,
      },
    },
  },
});
configure(loadStories, module);
