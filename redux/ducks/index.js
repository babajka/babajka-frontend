import { combineReducers } from 'redux';

import articles from './articles';
import auth from './auth';
import diary from './diary';

export default combineReducers({
  articles,
  auth,
  diary,
});
