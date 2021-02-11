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

const Header = ({ toggleSidebar, color }) => {
  const router = useRouter();
  return (
    <header className={b()}>
      <Link className={b('logo')} route={ROUTES_NAMES.main} titleId="header.to-main">
        <Logo size={42} color={color} />
      </Link>
      <div id={HEADER_LINKS_ID} className={b('title-container')}>
        <div className={b('title')}>
          {router.route === '/' ? (
            <Motto />
          ) : (
            <Link route={ROUTES_NAMES.main}>
              <span style={color ? { color } : {}}>
                <Text id="header.to-main" />
              </span>
            </Link>
          )}
        </div>
      </div>
      <Clickable tag="div" titleId="sidebar.open" className={b('burger')} onClick={toggleSidebar}>
        {[...Array(3)].map((value, i) => (
          <div
            // eslint-disable-next-line react/no-array-index-key
            key={i}
            className={b('burger-item')}
            style={color ? { backgroundColor: color } : {}}
          />
        ))}
      </Clickable>
    </header>
  );
};

export default Header;
