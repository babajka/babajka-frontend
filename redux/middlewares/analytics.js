import ReactGA from 'react-ga';

export default () => next => action => {
  if (typeof window !== 'undefined') {
    ReactGA.event({
      category: 'Redux Event',
      action: action.type,
    });
  }
  next(action);
};
