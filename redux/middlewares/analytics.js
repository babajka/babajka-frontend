import ReactGA from 'react-ga';

import { isLoading } from 'utils/redux';

const trackAction = ({ meta }) => meta?.ga;

const gaMiddleware = () => next => action => {
  if (typeof window !== 'undefined' && !isLoading(action) && trackAction(action)) {
    ReactGA.event({ category: 'Redux Event', action: action.type });
  }
  next(action);
};

export default gaMiddleware;
