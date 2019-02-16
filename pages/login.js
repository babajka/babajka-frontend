import React, { Component } from 'react';
import { withRouter } from 'next/router';
import PropTypes from 'prop-types';
import withRedux from 'next-redux-wrapper';
import { Router, ROUTES_NAMES } from 'routes';

import PageLayout from 'components/common/layout/PageLayout';
import LoginForm from 'components/auth/LoginForm';

import { actions, selectors } from 'redux/ducks/auth';
import initStore from 'redux/store';
import request from 'utils/request';

import 'styles/legacy/login-page/login-page.scss';

const mapStateToProps = state => ({
  user: selectors.getUser(state),
});

class LoginPage extends Component {
  static propTypes = {
    user: PropTypes.shape({}),
    router: PropTypes.shape({
      query: PropTypes.shape({
        invite: PropTypes.string,
      }).isRequired,
    }).isRequired,
  };

  static defaultProps = { user: null };

  static getInitialProps(ctx) {
    return request.populate(ctx, [actions.getCurrentUser]);
  }

  componentDidMount() {
    const {
      user,
      router: {
        query: { lang },
      },
    } = this.props;
    if (user) {
      Router.replaceRoute(ROUTES_NAMES.main, { lang });
    }
  }

  render() {
    const { router } = this.props;

    const {
      query: { lang, next = `/${lang}/articles` },
    } = router;

    return (
      <PageLayout className="page-content" title="auth.signIn" router={router}>
        <div className="container login">
          <LoginForm allowSignUp={router.query.invite === 'beta-test-sign-up'} next={next} />
        </div>
      </PageLayout>
    );
  }
}

export default withRouter(withRedux(initStore, mapStateToProps)(LoginPage));
