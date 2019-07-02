import { combineReducers } from 'redux';

import articles from './articles';
import auth from './auth';
import diary from './diary';
import home from './home';
import sidebar from './sidebar';
import topics from './topics';

export default combineReducers({
  home,
  articles,
  auth,
  diary,
  sidebar,
  topics,
});
