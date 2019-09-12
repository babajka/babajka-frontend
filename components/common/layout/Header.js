import './navbar.scss';

import React from 'react';

import Text from 'components/common/Text';
import Link from 'components/common/Link';
import Clickable from 'components/common/Clickable';
import { TagLink } from 'utils/tags';

import { ROUTES_NAMES } from 'routes';
import { TOPIC } from 'constants/misc';

import Logo from 'assets/logo/Logo';

const Header = ({ toggleSidebar }) => (
  <header className="navbar">
    <Link route={ROUTES_NAMES.main} titleId="header.main">
      <Logo size={42} />
    </Link>
    <div className="navbar__title">
      <Text id="common.motto">
        {(bel, asWell, world, culture, and, history) => (
          <>
            <TagLink topic={TOPIC.locations} tag="belarus">
              {bel}
            </TagLink>
            {asWell}
            <TagLink topic={TOPIC.locations} tag="europe">
              {world}
            </TagLink>
            <TagLink topic={TOPIC.themes} tag="art">
              {culture}
            </TagLink>
            {and}
            <TagLink topic={TOPIC.themes} tag="history">
              {history}
            </TagLink>
          </>
        )}
      </Text>
    </div>
    <Clickable tag="div" className="navbar__burger" onClick={toggleSidebar}>
      <div className="navbar__burger-item" />
      <div className="navbar__burger-item" />
      <div className="navbar__burger-item" />
    </Clickable>
  </header>
);

export default Header;
