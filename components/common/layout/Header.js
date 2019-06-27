import './navbar.scss';

import React from 'react';

import Link from 'components/common/Link';
import Clickable from 'lib/components/Clickable';

import { ROUTES_NAMES } from 'routes';

import Logo from 'assets/logo/Logo';

const Header = ({ toggleSidebar }) => (
  <div className="navbar">
    <Link route={ROUTES_NAMES.main}>
      <Logo size={42} />
    </Link>
    <div className="navbar__title">
      <Link>Беларуская</Link>, а таксама <Link>сусветная</Link> культура і <Link>гісторыя</Link>
    </div>
    <Clickable tag="div" className="navbar__burger" onClick={toggleSidebar}>
      <div className="navbar__burger-item" />
      <div className="navbar__burger-item" />
      <div className="navbar__burger-item" />
    </Clickable>
  </div>
);

export default Header;
