import React from 'react';
import { useRouter } from 'next/router';

import Text from 'components/common/Text';
import Link from 'components/common/Link';
import Clickable from 'components/common/Clickable';

import { ROUTES_NAMES } from 'routes';

import Logo from 'assets/logo/Logo';
import Motto from './header/Motto';
import { HEADER_LINKS_ID } from './header/HeaderLinks';

const Header = ({ toggleSidebar }) => {
  const router = useRouter();
  return (
    <header className="navbar">
      <Link className="navbar__logo" route={ROUTES_NAMES.main} titleId="header.to-main">
        <Logo size={42} />
      </Link>
      <div id={HEADER_LINKS_ID} className="navbar__title-container">
        <div className="navbar__title">
          {router.route === '/' ? (
            <Motto />
          ) : (
            <Link route={ROUTES_NAMES.main}>
              <Text id="header.to-main" />
            </Link>
          )}
        </div>
      </div>
      <Clickable
        tag="div"
        titleId="sidebar.open"
        className="navbar__burger"
        onClick={toggleSidebar}
      >
        <div className="navbar__burger-item" />
        <div className="navbar__burger-item" />
        <div className="navbar__burger-item" />
      </Clickable>
    </header>
  );
};

export default Header;
