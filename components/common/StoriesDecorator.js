import React from 'react';

import 'babajka-markup/dist/styles/assets.min.css';
import 'babajka-markup/dist/styles/bundle.min.css';

export default getStory => <div style={{ margin: '5%' }}>{getStory()}</div>;
