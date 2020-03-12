import styles from 'styles/pages/login.module.scss';

import React from 'react';
import PropTypes from 'prop-types';
import { ROUTES_NAMES } from 'routes';
import { connect } from 'react-redux';
import bem from 'bem-css-modules';

import Redirect from 'components/common/Redirect';
import LoginForm from 'components/auth/LoginForm';

import { authSelectors } from 'redux/ducks/auth';
import { UserShape } from 'utils/customPropTypes';

const b = bem(styles);

const mapStateToProps = state => ({
  user: authSelectors.getUser(state),
});

const LoginPage = ({ user, routerQuery: { next = ROUTES_NAMES.admin.articles } }) => {
  if (user) {
    return <Redirect to={next} />;
  }

  return (
    <div className={b('container')}>
      <div className={b('wrap')}>
        <LoginForm />
      </div>
    </div>
  );
};

LoginPage.propTypes = {
  user: UserShape,
  routerQuery: PropTypes.shape({
    next: PropTypes.string,
  }).isRequired,
};

LoginPage.defaultProps = {
  user: null,
};

LoginPage.getLayoutProps = () => ({
  title: 'auth.signIn',
  hideSidebar: true,
  hideFooter: true,
});

export default connect(mapStateToProps)(LoginPage);
