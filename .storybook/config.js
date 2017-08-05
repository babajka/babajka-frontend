import { configure, setAddon } from '@storybook/react';
import infoAddon from '@storybook/addon-info';

const req = require.context('../components', true, /\.stories\.jsx?$/);

function loadStories() {
  req.keys().forEach(req);
}

setAddon(infoAddon);
configure(loadStories, module);
