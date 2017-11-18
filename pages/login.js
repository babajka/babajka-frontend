import React from 'react';
import PropTypes from 'prop-types';
import withRedux from 'next-redux-wrapper';

import CoreLayout from 'components/common/CoreLayout';
import LoginForm from 'components/auth/LoginForm';

import { actions, selectors } from 'redux/ducks/auth';
import initStore from 'redux/store';

const mapStateToProps = state => ({
  user: selectors.getUser(state),
  pending: selectors.isLoginPending(state),
  errors: selectors.getLoginErrors(state),
});

const mapDispatchToProps = {
  signIn: actions.signIn,
};

const LoginPage = ({ user, pending, errors, signIn }) => {
  const handleSubmit = ({ email, password, signUp }) => {
    signIn({ email, password, name }, signUp);
  };

  return (
    <CoreLayout title="Login">
      {user && <p>Вітаем вас, {user.email}</p>}
      <div className="container login">
        <LoginForm
          onSubmit={handleSubmit}
          pending={pending}
          errors={errors}
        />
      </div>
    </CoreLayout>
  );
};

LoginPage.propTypes = {
  user: PropTypes.shape({}),
  pending: PropTypes.bool.isRequired,
  errors: PropTypes.shape({}),
  signIn: PropTypes.func.isRequired,
};

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(LoginPage);
