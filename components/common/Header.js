import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { connect } from 'react-redux';
import { actions, selectors } from 'redux/ducks/auth';

import text from 'constants/dictionary';

import Button from 'components/common/Button';
import LanguageSwitcher from './LanguageSwitcher';

const mapStateToProps = state => ({ user: selectors.getUser(state) });

const mapDispatchToProps = { signOut: actions.signOut };

/* TODO: get values for langs and links from dictionary ? */

const langs = [
  { id: 'be', value: 'беларуская' },
  { id: 'ru', value: 'русский' },
  { id: 'en', value: 'english' },
];

const links = [
  { href: 'articles', value: 'АРТЫКУЛЫ', id: 'articles' },
  { href: 'collections', value: 'КАЛЕКЦЫІ', id: 'collections' },
  { href: 'partners', value: 'ПАРТНЁРЫ', id: 'partners' },
];

const Header = ({ user, signOut }) => (
  <div className="navbar ">
    <div className="navbar-brand">
      <a className="navbar-item" href="/">
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
            <span key={link.id} className="navbar-item">
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
                {text.signOutTitle}
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
);

Header.propTypes = {
  user: PropTypes.shape({ email: PropTypes.string.isRequired }),
  signOut: PropTypes.func.isRequired,
};

Header.defaultProps = { user: null };

export default connect(mapStateToProps, mapDispatchToProps)(Header);
