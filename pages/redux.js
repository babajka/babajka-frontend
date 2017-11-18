import React, { PropTypes } from 'react';
import withRedux from 'next-redux-wrapper';

import initStore from 'redux/store';
import { actions } from 'redux/ducks/auth';

const mapStateToProps = state => ({
  user: state.auth.user,
});

const mapDispatchToProps = {
  login: actions.login,
};

const Test = ({ user, login }) => (
  <div>
    {user && (
      <span>
        <p>email: {user.email}</p>
        <p>password: {user.password}</p>
      </span>
    )}
    <button onClick={login.bind(null, 'test@gmail.com', 'password')}>Authorize!</button>
  </div>
);

Test.propTypes = {
  user: PropTypes.shape({}).isRequired,
  login: PropTypes.func.isRequired,
};

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(Test);
