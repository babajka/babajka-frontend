import React, { Component } from 'react';
import Router from 'next/router';
import PropTypes from 'prop-types';
import withRedux from 'next-redux-wrapper';

import CoreLayout from 'components/common/CoreLayout';
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
      Router.replace('/');
    }
  }

  handleSubmit = ({ signUp, ...userData }) => {
    const { signIn, url: { query: { next = '/' } } } = this.props;
    signIn({ ...userData }, signUp).then(() => Router.push(next));
  };

  render() {
    const { pending, errors } = this.props;
    return (
      <CoreLayout title="Login">
        <div className="container login">
          <LoginForm onSubmit={this.handleSubmit} pending={pending} errors={errors} />
        </div>
      </CoreLayout>
    );
  }
}

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(LoginPage);
