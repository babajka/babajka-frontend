import React from 'react';

import 'static/styles/assets.min.css';
import 'static/styles/bundle.min.css';

export default getStory => <div style={{ margin: '5%' }}>{getStory()}</div>;
