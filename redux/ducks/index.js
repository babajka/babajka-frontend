import { combineReducers } from 'redux';

import home from './home';
import auth from './auth';
import diary from './diary';
import sidebar from './sidebar';
import publicArticle from './publicArticle';
import topics from './topics';
import tags from './tags';

import admin from './admin';

export default combineReducers({
  home,
  auth,
  diary,
  sidebar,
  publicArticle,
  topics,
  tags,

  admin,
});
