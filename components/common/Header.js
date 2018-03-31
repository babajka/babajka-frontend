import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'next/router';
import Link from 'next/link';
import { connect } from 'react-redux';
import classNames from 'classnames';

import Clickable from 'components/common/Clickable';
import ArticleLink from 'components/articles/ArticleLink';

import { actions, selectors } from 'redux/ducks/auth';
import text from 'constants/dictionary';
import routes from 'constants/routing';

const mapStateToProps = state => ({ user: selectors.getUser(state) });

const mapDispatchToProps = { signOut: actions.signOut };

/* TODO: get values for langs and links from dictionary ? */
// const langs = [
//   { id: 'be', value: 'беларуская' },
//   { id: 'ru', value: 'русский' },
//   { id: 'en', value: 'english' },
// ];

const { home, collections, partners, articles, about, login } = routes;

// TODO: replace with some routing lib
// TODO: check for permissions for routes
const ROUTES = [
  { href: home, value: 'АРТЫКУЛЫ', id: 'articles' },
  { href: collections, value: 'КАЛЕКЦЫІ', id: 'collections' },
  { href: partners, value: 'ПАРТНЁРЫ', id: 'partners' },
  {
    href: articles.create,
    id: 'create-article',
    value: 'СТВАРЫЦЬ АРТЫКУЛ',
    NavLink: ({ children }) => <ArticleLink mode="create">{children}</ArticleLink>,
  },
  { href: about, value: 'ПРА НАС', id: 'about' },
];

const Header = ({ user, signOut, router }) => (
  <div className="navbar ">
    <div className="navbar-brand">
      <a className="navbar-item" href="/">
        {/* TODO: replace with div background? */}
        <img
          className="logo-image"
          src="/static/images/logo-turq-transparent.png"
          alt="Wir.by logo"
        />
      </a>
    </div>
    <div id="navmenu" className="navbar-menu">
      <div className="navbar-start">
        {ROUTES.map(({ NavLink = Link, id, href, value }) => (
          <NavLink key={id} href={href}>
            <a className="navbar-item">
              <span className={classNames('rubric', { 'is-active': router.asPath === href })}>
                {value}
              </span>
            </a>
          </NavLink>
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
                onClick={() => (user ? signOut() : router.push(login))}
              >
                {user ? text.signOutTitle : text.sigInTitle}
              </Clickable>
            </div>
            <div>
              <div className="dropdown is-right is-hoverable">
                <div className="dropdown-trigger">
                  <span className="current-lang">беларуская</span>
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
  router: PropTypes.shape({
    asPath: PropTypes.string.isRequired,
  }).isRequired,
  user: PropTypes.shape({ email: PropTypes.string.isRequired }),
  signOut: PropTypes.func.isRequired,
};

Header.defaultProps = { user: null };

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
