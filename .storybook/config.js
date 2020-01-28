import '../styles/index.scss';

import { configure, addParameters, addDecorator } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';

import StoriesDecorator from 'components/dev/StoriesDecorator';

const req = require.context('../stories', true, /\.js$/);

function loadStories() {
  req.keys().forEach(req);
}

addParameters({
  options: {
    isFullScreen: false,
    showNav: true,
    showPanel: true,
    panelPosition: 'bottom',
    sortStoriesByKind: false,
    hierarchySeparator: /\/|\./,
    hierarchyRootSeparator: /\|/,
    sidebarAnimations: true,
    enableShortcuts: true,
    theme: undefined,
  },
});

addDecorator(withKnobs);
addDecorator(StoriesDecorator);

configure(loadStories, module);
