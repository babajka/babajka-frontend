import 'styles/pages/login.scss';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Router, ROUTES_NAMES } from 'routes';
import { connect } from 'react-redux';

import LoginForm from 'components/auth/LoginForm';

import { authSelectors } from 'redux/ducks/auth';
import { LangType, UserShape } from 'utils/customPropTypes';

const mapStateToProps = state => ({
  user: authSelectors.getUser(state),
});

class LoginPage extends Component {
  static propTypes = {
    user: UserShape,
    lang: LangType.isRequired,
    routerQuery: PropTypes.shape({
      next: PropTypes.string,
    }).isRequired,
  };

  static defaultProps = {
    user: null,
  };

  static getLayoutProps = () => ({
    title: 'auth.signIn',
    hideSidebar: true,
    hideFooter: true,
  });

  componentDidMount() {
    const { user, lang } = this.props;

    if (user) {
      Router.replaceRoute(ROUTES_NAMES.admin.dashboard, { lang });
    }
  }

  render() {
    const {
      lang,
      routerQuery: { next = `/${lang}/admin/dashboard` },
    } = this.props;

    return (
      <div className="login-page-container">
        <div className="login-page-wrap">
          <LoginForm next={next} />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(LoginPage);
