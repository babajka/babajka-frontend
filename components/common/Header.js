import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { connect } from 'react-redux';
import { actions, selectors } from 'redux/ducks/auth';

import Button from 'components/common/Button';
import LanguageSwitcher from './LanguageSwitcher';

const mapStateToProps = state => ({ user: selectors.getUser(state) });

const mapDispatchToProps = { signOut: actions.signOut };

const langs = [
  { id: 'be', value: 'беларуская' },
  { id: 'ru', value: 'русский' },
  { id: 'en', value: 'english' },
];

const links = [
  { href: 'articles', value: 'АРТЫКУЛЫ' },
  { href: 'collections', value: 'КАЛЕКЦЫІ' },
  { href: 'partners', value: 'ПАРТНЁРЫ' },
];

const Header = ({ user, signOut }) => (
  <div className="">
    <div className="navbar ">
      <div className="navbar-brand">
        <a className="navbar-item" href="static/main-page/main-page.html">
          {/* TODO: replace with div background? */}
          <img
            className="logo-image"
            src="static/images/logo-turq-transparent.png"
            alt="It is a logo"
          />
        </a>
      </div>
      <div id="navmenu" className="navbar-menu">
        <div className="navbar-start">
          {links &&
            links.length &&
            links.map(link => (
              <span className="navbar-item">
                <Link href={link.href}>
                  <span className="rubric">{link.value}</span>
                </Link>
              </span>
            ))}
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="user">
              <span>{user && user.email}</span>
              <div>
                <Button onClick={e => signOut(e)} className="button logout is-text">
                  Выйсці
                </Button>
              </div>
              <div>
                <LanguageSwitcher currentLang={langs[0]} langs={langs} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

Header.propTypes = {
  user: PropTypes.shape({ email: PropTypes.string.isRequired }),
  signOut: PropTypes.func.isRequired,
};

Header.defaultProps = { user: null };

export default connect(mapStateToProps, mapDispatchToProps)(Header);
