import { configure, setAddon } from '@storybook/react';
import infoAddon from '@storybook/addon-info';

const req = require.context('../components', true, /\.stories\.js$/);

function loadStories() {
  req.keys().forEach(req);
}

setAddon(infoAddon);
configure(loadStories, module);
