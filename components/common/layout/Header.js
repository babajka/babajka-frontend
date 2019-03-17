import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'next/router';
import { connect } from 'react-redux';
import cn from 'classnames';
import Cookies from 'js-cookie';

import { authActions, authSelectors } from 'redux/ducks/auth';
import { Router, NAVBAR_ROUTES, ROUTES_NAMES } from 'routes';
import { LOCALES, LANGS } from 'constants';
import { LANG_COOKIE_NAME } from 'constants/server';

import Clickable from 'components/common/Clickable';
import Link from 'components/common/Link';
import LocaleContext from 'components/common/LocaleContext';
import Text from 'components/common/Text';

import 'styles/legacy/navbar/navbar.scss';

const mapStateToProps = state => ({
  user: authSelectors.getUser(state),
  permissions: authSelectors.getPermissions(state),
});
const mapDispatchToProps = {
  signOut: authActions.signOut,
};

const getLocaleSwitchUrl = (path, lang) => {
  const parts = path.split('/');
  parts[1] = lang;
  return parts.join('/');
};

class Header extends Component {
  static propTypes = {
    router: PropTypes.shape({
      asPath: PropTypes.string.isRequired,
    }).isRequired,
    user: PropTypes.shape({ email: PropTypes.string.isRequired }),
    permissions: PropTypes.shape({}).isRequired,
    signOut: PropTypes.func.isRequired,
  };

  static defaultProps = { user: null };

  state = {
    burgerActive: false,
  };

  handleAuthClick = lang => {
    const { user, signOut } = this.props;
    if (!user) {
      Router.pushRoute(ROUTES_NAMES.login, { lang });
      return;
    }
    signOut().then(() => Router.pushRoute(ROUTES_NAMES.main, { lang }));
  };

  handleLangClick = lang => {
    Cookies.set(LANG_COOKIE_NAME, lang);
  };

  render() {
    const {
      user,
      permissions,
      router: { asPath },
    } = this.props;
    const { burgerActive } = this.state;
    const routes = NAVBAR_ROUTES.filter(({ permission: key }) => !key || permissions[key]);

    return (
      <div className="navbar">
        <div className="navbar-brand">
          <Link route={ROUTES_NAMES.main}>
            <a className="navbar-item">
              {/* TODO: replace with div background? */}
              <img
                className="logo-image"
                src="/static/images/logo/W-coloured-transparent.png"
                alt="Wir.by logo"
              />
            </a>
          </Link>
          <Clickable
            tag="div"
            onClick={() => this.setState({ burgerActive: !burgerActive })}
            className={cn('button navbar-burger', { 'is-active': burgerActive })}
          >
            <span />
            <span />
            <span />
          </Clickable>
        </div>
        <LocaleContext.Consumer>
          {lang => (
            <div className={cn('navbar-menu', { 'is-active': burgerActive })}>
              <div className="navbar-start">
                {routes.map(({ NavLink = Link, name, pattern = name, params, isActive }) => (
                  <NavLink key={name} route={name} params={params} lang={lang}>
                    <a className="navbar-item">
                      <span className={cn('rubric', { 'is-active': isActive(asPath, pattern) })}>
                        <Text id={`header.${name}`} render={t => t.toUpperCase()} />
                      </span>
                    </a>
                  </NavLink>
                ))}
              </div>
              <div className="navbar-end">
                <div className="navbar-item">
                  <div className="user">
                    <div className="name-section">{user && user.displayName}</div>
                    <div className="auth-section">
                      <Clickable
                        tag="a"
                        className="auth-button"
                        onClick={this.handleAuthClick.bind(null, lang)}
                      >
                        <Text id={`auth.${user ? 'signOut' : 'signIn'}`} />
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
                              <Link
                                key={id}
                                route={getLocaleSwitchUrl(asPath, id)}
                                params={{ lang: id }}
                              >
                                <Clickable
                                  onClick={this.handleLangClick.bind(null, id)}
                                  className="dropdown-item lang"
                                >
                                  {label}
                                </Clickable>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </LocaleContext.Consumer>
      </div>
    );
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Header)
);
