import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'next/router';
import { connect } from 'react-redux';
import classNames from 'classnames';

import { actions, selectors } from 'redux/ducks/auth';
import { Router, NAVBAR_ROUTES, ROUTES_NAMES } from 'routes';
import { LOCALES, LANGS } from 'constants';

import Clickable from 'components/common/Clickable';
import Link from 'components/common/Link';
import LocaleContext from 'components/common/LocaleContext';
import Text from 'components/common/Text';

const mapStateToProps = state => ({ user: selectors.getUser(state) });
const mapDispatchToProps = { signOut: actions.signOut };

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
    signOut: PropTypes.func.isRequired,
  };

  static defaultProps = { user: null };

  state = {
    burgerActive: false,
  };

  render() {
    const { user, signOut, router: { asPath } } = this.props;
    const { burgerActive } = this.state;

    return (
      <div className="navbar">
        <div className="navbar-brand">
          <Link route={ROUTES_NAMES.home}>
            <a className="navbar-item">
              {/* TODO: replace with div background? */}
              <img
                className="logo-image"
                src="/static-prod/logo-turq-transparent.png"
                alt="Wir.by logo"
              />
            </a>
          </Link>
          <Clickable
            tag="div"
            onClick={() => this.setState({ burgerActive: !burgerActive })}
            className={classNames('button navbar-burger', { 'is-active': burgerActive })}
          >
            <span />
            <span />
            <span />
          </Clickable>
        </div>
        <LocaleContext.Consumer>
          {lang => (
            <div className={classNames('navbar-menu', { 'is-active': burgerActive })}>
              <div className="navbar-start">
                {/* // TODO: check permissions for routes */}
                {NAVBAR_ROUTES.map(({ NavLink = Link, name, pattern = name, params, isActive }) => (
                  <NavLink key={name} route={name} params={params} lang={lang}>
                    <a className="navbar-item">
                      <span
                        className={classNames('rubric', { 'is-active': isActive(asPath, pattern) })}
                      >
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
                        onClick={() =>
                          user ? signOut() : Router.pushRoute(ROUTES_NAMES.login, { lang })
                        }
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
                                <a className="dropdown-item lang">{label}</a>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
