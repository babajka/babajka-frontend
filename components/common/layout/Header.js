import './navbar.scss';

import React from 'react';

import Link from 'components/common/Link';
import Clickable from 'components/common/Clickable';

import { ROUTES_NAMES } from 'routes';

import Logo from 'assets/logo/Logo';

const Header = ({ toggleSidebar }) => (
  <div className="navbar">
    <Link route={ROUTES_NAMES.main}>
      <Logo size={42} />
    </Link>
    <div className="navbar__title">Беларуская, а таксама сусветная культура і гісторыя</div>
    <Clickable tag="div" className="navbar__burger" onClick={toggleSidebar}>
      <div className="navbar__burger-item" />
      <div className="navbar__burger-item" />
      <div className="navbar__burger-item" />
    </Clickable>
  </div>
);

export default Header;
