import { createContext, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';

import { ROUTES_NAMES } from 'routes';

export const INITIAL_LINKS = [];

export const HeaderLinksContext = createContext(INITIAL_LINKS);

export const useHeaderLinksContext = () => useContext(HeaderLinksContext);

const HeaderLinks = ({ links }) => {
  const [_, setState] = useHeaderLinksContext();
  useEffect(() => {
    setState(links);
    return () => {
      setState(INITIAL_LINKS);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
};

HeaderLinks.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      route: Object.values(ROUTES_NAMES),
      key: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      params: PropTypes.shape({}),
    })
  ).isRequired,
};

export default HeaderLinks;
