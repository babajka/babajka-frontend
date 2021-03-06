import React from 'react';
import PropTypes from 'prop-types';
import bem from 'bem-css-modules';

import Portal from 'components/common/Portal';
import Link from 'components/common/Link';

import { ROUTES_NAMES } from 'routes';

import styles from './header.module.scss';

const b = bem(styles);

export const HEADER_LINKS_ID = 'header-links';

const HeaderLinks = ({ links }) => (
  <Portal id={HEADER_LINKS_ID}>
    {links.map(({ key, route, params, title }) => (
      <Link className={b('title')} key={key} route={route} params={params}>
        {title}
      </Link>
    ))}
  </Portal>
);

HeaderLinks.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      route: PropTypes.oneOf(Object.values(ROUTES_NAMES)),
      key: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      params: PropTypes.shape({}),
    })
  ).isRequired,
};

export default HeaderLinks;
