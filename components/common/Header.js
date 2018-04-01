import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'next/router';
import { connect } from 'react-redux';
import classNames from 'classnames';

import Clickable from 'components/common/Clickable';

import { actions, selectors } from 'redux/ducks/auth';
import text from 'constants/dictionary';
import { Link, Router, NAVBAR_ROUTES, ROUTES_NAMES } from 'routes';
import { LOCALES } from 'constants';

const mapStateToProps = state => ({ user: selectors.getUser(state) });
const mapDispatchToProps = { signOut: actions.signOut };

const checkActive = (path, name) => path.split('/').slice(-1)[0] === name;

// TODO: check for permissions for routes
const Header = ({ user, signOut, lang, router: { asPath } }) => (
  <div className="navbar">
    <div className="navbar-brand">
      <Link route={ROUTES_NAMES.home} params={{ lang }}>
        <a className="navbar-item">
          {/* TODO: replace with div background? */}
          <img
            className="logo-image"
            src="/static/images/logo-turq-transparent.png"
            alt="Wir.by logo"
          />
        </a>
      </Link>
    </div>
    <div id="navmenu" className="navbar-menu">
      <div className="navbar-start">
        {NAVBAR_ROUTES.map(({ name, label, pattern = name, params, isActive = checkActive }) => (
          <Link key={name} route={name} params={{ lang, ...params }}>
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
          <div className="user">
            <span>{user && user.email}</span>
            <div>
              <Clickable
                tag="a"
                className="logout"
                onClick={() => (user ? signOut() : Router.pushRoute(ROUTES_NAMES.login, { lang }))}
              >
                {user ? text.signOutTitle : text.sigInTitle}
              </Clickable>
            </div>
            <div>
              <div className="dropdown is-right is-hoverable">
                <div className="dropdown-trigger">
                  <span className="current-lang">{LOCALES[lang]}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

Header.propTypes = {
  lang: PropTypes.string.isRequired,
  router: PropTypes.shape({
    asPath: PropTypes.string.isRequired,
  }).isRequired,
  user: PropTypes.shape({ email: PropTypes.string.isRequired }),
  signOut: PropTypes.func.isRequired,
};

Header.defaultProps = { user: null };

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
