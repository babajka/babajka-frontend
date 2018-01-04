import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import withRedux from 'next-redux-wrapper';

import CoreLayout from 'components/common/CoreLayout';
import Button from 'components/common/Button';

import { actions, selectors } from 'redux/ducks/auth';
import initStore from 'redux/store';

const mapStateToProps = state => ({ user: selectors.getUser(state) });

const mapDispatchToProps = { signOut: actions.signOut };

const HomePage = ({ user, signOut }) => (
  <CoreLayout>
    <h1 className="title">Welcome to next.js!</h1>
    <p>Hello, {user ? user.email : 'anonymous'}!</p>
    {!user && (
      <Link href="login">
        <Button>login</Button>
      </Link>
    )}
    {user && <Button onClick={signOut.bind(null)}>logout</Button>}
  </CoreLayout>
);

HomePage.propTypes = {
  user: PropTypes.shape({ email: PropTypes.string.isRequired }),
  signOut: PropTypes.func.isRequired,
};

HomePage.defaultProps = { user: null };

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(HomePage);
