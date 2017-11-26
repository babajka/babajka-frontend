import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import withRedux from 'next-redux-wrapper';

import CoreLayout from 'components/common/CoreLayout';
import Button from 'components/common/Button';

import { selectors } from 'redux/ducks/auth';
import initStore from 'redux/store';

const mapStateToProps = state => ({ user: selectors.getUser(state) });

const HomePage = ({ user }) => (
  <CoreLayout>
    <h1 className="title">Welcome to next.js!</h1>
    <p>Hello, {user ? user.email : 'anonymous'}!</p>
    {!user && (
      <Link href="login">
        <Button>login</Button>
      </Link>
    )}
  </CoreLayout>
);

HomePage.propTypes = { user: PropTypes.shape({ email: PropTypes.string.isRequired }) };

HomePage.defaultProps = { user: null };

export default withRedux(initStore, mapStateToProps)(HomePage);
