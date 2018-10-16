import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withRedux from 'next-redux-wrapper';
import { Router, ROUTES_NAMES } from 'routes';

import PageLayout from 'components/common/layout/PageLayout';
import LoginForm from 'components/auth/LoginForm';

import { actions, selectors } from 'redux/ducks/auth';
import initStore from 'redux/store';
import request from 'utils/request';

const mapStateToProps = state => ({
  user: selectors.getUser(state),
});

class LoginPage extends Component {
  static propTypes = {
    user: PropTypes.shape({}),
    url: PropTypes.shape({
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
      url: {
        query: { lang },
      },
    } = this.props;
    if (user) {
      Router.replaceRoute(ROUTES_NAMES.home, { lang });
    }
  }

  render() {
    const { url } = this.props;

    const {
      query: { lang, next = `/${lang}/articles` },
    } = url;

    return (
      <PageLayout className="page-content" title="auth.signIn" url={url}>
        <div className="container login">
          <LoginForm allowSignUp={url.query.invite === 'beta-test-sign-up'} next={next} />
        </div>
      </PageLayout>
    );
  }
}

export default withRedux(initStore, mapStateToProps)(LoginPage);
