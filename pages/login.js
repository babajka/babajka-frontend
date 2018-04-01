import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withRedux from 'next-redux-wrapper';
import { Router, ROUTES_NAMES } from 'routes';
import { DEFAULT_LOCALE } from 'constants';

import PageLayout from 'components/common/PageLayout';
import LoginForm from 'components/auth/LoginForm';

import { actions, selectors } from 'redux/ducks/auth';
import initStore from 'redux/store';
import request from 'utils/request';

const mapStateToProps = state => ({
  user: selectors.getUser(state),
  pending: selectors.isLoginPending(state),
  errors: selectors.getLoginErrors(state),
});

const mapDispatchToProps = { signIn: actions.signIn };

class LoginPage extends Component {
  static propTypes = {
    user: PropTypes.shape({}),
    pending: PropTypes.bool.isRequired,
    errors: PropTypes.shape({}).isRequired,
    signIn: PropTypes.func.isRequired,
    url: PropTypes.shape({ query: PropTypes.shape({ next: PropTypes.string }).isRequired })
      .isRequired,
  };

  static defaultProps = { user: null };

  static getInitialProps(ctx) {
    return request.populate(ctx, [actions.getCurrentUser]);
  }

  componentDidMount() {
    const { user } = this.props;
    if (user) {
      Router.replaceRoute(ROUTES_NAMES.home, { lang: DEFAULT_LOCALE });
    }
  }

  handleSubmit = ({ signUp, ...userData }) => {
    const { signIn, url: { query: { next = `/${DEFAULT_LOCALE}/articles` } } } = this.props;
    signIn({ ...userData }, signUp).then(() => Router.pushRoute(next));
  };

  render() {
    const { pending, errors, url } = this.props;
    return (
      <PageLayout title="Login" url={url}>
        <div className="container login">
          <LoginForm onSubmit={this.handleSubmit} pending={pending} errors={errors} />
        </div>
      </PageLayout>
    );
  }
}

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(LoginPage);
