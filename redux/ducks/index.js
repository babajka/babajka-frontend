import { combineReducers } from 'redux';

import articles from './articles';
import auth from './auth';
import diary from './diary';
import home from './home';

export default combineReducers({
  home,
  articles,
  auth,
  diary,
});
