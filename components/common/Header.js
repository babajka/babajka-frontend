import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'next/router';
import { connect } from 'react-redux';
import classNames from 'classnames';

import Clickable from 'components/common/Clickable';
import Link from 'components/common/Link';
import LocaleContext from 'components/common/LocaleContext';

import { actions, selectors } from 'redux/ducks/auth';
import text from 'constants/dictionary';
import { Router, NAVBAR_ROUTES, ROUTES_NAMES } from 'routes';
import { LOCALES, LANGS } from 'constants';

const mapStateToProps = state => ({ user: selectors.getUser(state) });
const mapDispatchToProps = { signOut: actions.signOut };

const checkActive = (path, name) => path.split('/').slice(-1)[0] === name;

const getLocaleSwitchUrl = (path, lang) => {
  const parts = path.split('/');
  parts[1] = lang;
  return parts.join('/');
};

// TODO: check for permissions for routes
const Header = ({ user, signOut, router: { asPath } }) => (
  <div className="navbar">
    <div className="navbar-brand">
      <Link route={ROUTES_NAMES.home}>
        <a className="navbar-item">
          {/* TODO: replace with div background? */}
          <img
            className="logo-image"
            src="/static/images/logo-turq-transparent.png"
            alt="Wir.by logo"
          />
        </a>
      </Link>
      <div id="navburger" className="button navbar-burger">
        <span />
        <span />
        <span />
      </div>
    </div>
    <div id="navmenu" className="navbar-menu">
      <div className="navbar-start">
        {NAVBAR_ROUTES.map(({ name, label, pattern = name, params, isActive = checkActive }) => (
          <Link key={name} route={name} params={params}>
            <a className="navbar-item">
              <span className={classNames('rubric', { 'is-active': isActive(asPath, pattern) })}>
                {label.toUpperCase()}
              </span>
            </a>
          </Link>
        ))}
      </div>

      <div className="navbar-end">
        <div className="navbar-item">
          <LocaleContext.Consumer>
            {lang => (
              <div className="user">
                {/* TODO: to replace user.email with user.displayName once supported by API */}
                <span>{user && user.email}</span>
                <div className="auth-section">
                  <Clickable
                    tag="a"
                    className="auth-button"
                    onClick={() =>
                      user ? signOut() : Router.pushRoute(ROUTES_NAMES.login, { lang })
                    }
                  >
                    {user ? text.signOutTitle : text.sigInTitle}
                  </Clickable>
                </div>
                <div className="lang-section">
                  <div className="dropdown is-right is-hoverable">
                    <div className="dropdown-trigger">
                      <span className="current-lang">{LOCALES[lang]}</span>
                    </div>
                    <div className="dropdown-menu" role="menu">
                      <div className="dropdown-content">
                        {LANGS.filter(({ id }) => id !== lang).map(({ id, label }) => (
                          <Link route={getLocaleSwitchUrl(asPath, id)} params={{ lang: id }}>
                            <a className="dropdown-item lang">{label}</a>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </LocaleContext.Consumer>
        </div>
      </div>
    </div>
  </div>
);

Header.propTypes = {
  router: PropTypes.shape({
    asPath: PropTypes.string.isRequired,
  }).isRequired,
  user: PropTypes.shape({ email: PropTypes.string.isRequired }),
  signOut: PropTypes.func.isRequired,
};

Header.defaultProps = { user: null };

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
