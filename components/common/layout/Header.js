import './navbar.scss';

import React from 'react';
import { useRouter } from 'next/router';

import Text from 'components/common/Text';
import Link from 'components/common/Link';
import Clickable from 'components/common/Clickable';

import { TagLink } from 'utils/tags';

import { ROUTES_NAMES } from 'routes';
import { TOPIC } from 'constants/misc';

import Logo from 'assets/logo/Logo';
import { useHeaderLinksContext } from './HeaderLinks';

const Motto = () => (
  <>
    <span className="navbar__title--screen-wide">
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
    </span>
    <span className="navbar__title--screen-narrow">
      <Text id="common.motto-short">
        {(edu, wir) => (
          <>
            {edu}
            <Link route={ROUTES_NAMES.about}>{wir}</Link>
          </>
        )}
      </Text>
    </span>
  </>
);

const Header = ({ toggleSidebar }) => {
  const router = useRouter();
  const [links] = useHeaderLinksContext();
  return (
    <header className="navbar">
      <Link route={ROUTES_NAMES.main} titleId="header.to-main">
        <Logo size={42} />
      </Link>
      <div className="navbar__title-container">
        <div className="navbar__title">
          {router.route === '/' ? (
            <Motto />
          ) : (
            <Link route={ROUTES_NAMES.main}>
              <Text id="header.to-main" />
            </Link>
          )}
        </div>
        {links.map(({ key, route, params, title }) => (
          <Link className="navbar__title" key={key} route={route} params={params}>
            {title}
          </Link>
        ))}
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
