import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import { Router, ROUTES_NAMES } from 'routes';

import LoginForm from 'components/auth/LoginForm';

import { actions, selectors } from 'redux/ducks/auth';
import request from 'utils/request';
import { LangType } from 'utils/customPropTypes';

import 'styles/legacy/login-page/login-page.scss';

const mapStateToProps = state => ({
  user: selectors.getUser(state),
});

class LoginPage extends Component {
  static propTypes = {
    user: PropTypes.shape({}),
    lang: LangType.isRequired,
    router: PropTypes.shape({
      query: PropTypes.shape({
        next: PropTypes.string,
        invite: PropTypes.string,
      }).isRequired,
    }).isRequired,
  };

  static defaultProps = { user: null };

  static getInitialProps(ctx) {
    return request.populate(ctx, [actions.getCurrentUser]);
  }

  static layoutProps = {
    title: 'auth.signIn',
  };

  componentDidMount() {
    const { user, lang } = this.props;
    if (user) {
      Router.replaceRoute(ROUTES_NAMES.main, { lang });
    }
  }

  render() {
    const { router, lang } = this.props;

    const {
      query: { next = `/${lang}/articles`, invite },
    } = router;

    return (
      <div className="page-content">
        <div className="container login">
          <LoginForm allowSignUp={invite === 'beta-test-sign-up'} next={next} />
        </div>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps)(LoginPage));
