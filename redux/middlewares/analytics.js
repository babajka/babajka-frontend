import ReactGA from 'react-ga';

export default () => next => action => {
  if (typeof window !== 'undefined' && action.meta && action.meta.ga) {
    ReactGA.event({
      category: 'Redux Event',
      action: action.type,
    });
  }
  next(action);
};
