import ReactGA from 'react-ga';

import { isLoading } from 'utils/redux';

const trackAction = ({ meta }) => meta?.ga;

export default () => next => action => {
  if (typeof window !== 'undefined' && !isLoading(action) && trackAction(action)) {
    ReactGA.event({ category: 'Redux Event', action: action.type });
  }
  next(action);
};
