import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Router, ROUTES_NAMES } from 'routes';

import LoginForm from 'components/auth/LoginForm';

import { LangType, UserShape } from 'utils/customPropTypes';

class LoginPage extends Component {
  static propTypes = {
    user: UserShape,
    lang: LangType.isRequired,
    routerQuery: PropTypes.shape({
      next: PropTypes.string,
      invite: PropTypes.string,
    }).isRequired,
  };

  static defaultProps = {
    user: null,
  };

  static getLayoutProps = () => ({
    title: 'auth.signIn',
  });

  componentDidMount() {
    const { user, lang } = this.props;
    if (user) {
      Router.replaceRoute(ROUTES_NAMES.main, { lang });
    }
  }

  render() {
    const {
      lang,
      routerQuery: { next = `/${lang}/articles`, invite },
    } = this.props;

    return (
      <div className="page-content">
        <div className="container login">
          <LoginForm allowSignUp={invite === 'beta-test-sign-up'} next={next} />
        </div>
      </div>
    );
  }
}

export default LoginPage;
