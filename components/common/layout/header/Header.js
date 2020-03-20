import React from 'react';
import { useRouter } from 'next/router';
import bem from 'bem-css-modules';

import Text from 'components/common/Text';
import Link from 'components/common/Link';
import Clickable from 'components/common/Clickable';

import { ROUTES_NAMES } from 'routes';

import Logo from 'assets/logo/Logo';
import Motto from './Motto';
import { HEADER_LINKS_ID } from './HeaderLinks';

import styles from './header.module.scss';

const b = bem(styles);

const Header = ({ toggleSidebar }) => {
  const router = useRouter();
  return (
    <header className={b()}>
      <Link className={b('logo')} route={ROUTES_NAMES.main} titleId="header.to-main">
        <Logo size={42} />
      </Link>
      <div id={HEADER_LINKS_ID} className={b('title-container')}>
        <div className={b('title')}>
          {router.route === '/' ? (
            <Motto />
          ) : (
            <Link route={ROUTES_NAMES.main}>
              <Text id="header.to-main" />
            </Link>
          )}
        </div>
      </div>
      <Clickable tag="div" titleId="sidebar.open" className={b('burger')} onClick={toggleSidebar}>
        <div className={b('burger-item')} />
        <div className={b('burger-item')} />
        <div className={b('burger-item')} />
      </Clickable>
    </header>
  );
};

export default Header;
