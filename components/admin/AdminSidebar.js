import './admin-sidebar.scss';

import React from 'react';
import { useRouter } from 'next/router';

import Link from 'components/common/Link';
import Text from 'components/common/Text';
import Clickable from 'components/common/Clickable';
import Dispatcher from 'lib/components/Dispatcher';

import { authActions } from 'redux/ducks/auth';
import { ADMIN_ROUTES, ROUTES_NAMES } from 'routes';

const IGNORE_ROUTES = ['login', 'preview'].map(page => ROUTES_NAMES.admin[page]);

const AdminSidebar = () => {
  const router = useRouter();
  return (
    <div className="admin-sidebar">
      <ul className="admin-sidebar-nav-list">
        {ADMIN_ROUTES.filter(({ name }) => !IGNORE_ROUTES.includes(name)).map(({ name, page }) => (
          <li key={name}>
            {/* FIXME: active */}
            <Link route={name} active={router.route.includes(page)}>
              <Text id={name} />
            </Link>
          </li>
        ))}
        <br />
        <li>
          <Dispatcher action={authActions.signOut}>
            {({ onDispatch }) => (
              <Clickable className="wir-link" onClick={onDispatch}>
                <Text id="auth.signOut" />
              </Clickable>
            )}
          </Dispatcher>
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
