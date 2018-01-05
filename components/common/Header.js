import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { connect } from 'react-redux';

import Button from 'components/common/Button';

import { actions, selectors } from 'redux/ducks/auth';

const mapStateToProps = state => ({ user: selectors.getUser(state) });

const mapDispatchToProps = { signOut: actions.signOut };

const Header = ({ user, signOut }) => (
  <div>
    <p>Hello, {user ? user.email : 'anonymous'}!</p>
    {!user && (
      <Link href="login">
        <Button>login</Button>
      </Link>
    )}
    {user && <Button onClick={signOut.bind(null)}>logout</Button>}
  </div>
);

Header.propTypes = {
  user: PropTypes.shape({ email: PropTypes.string.isRequired }),
  signOut: PropTypes.func.isRequired,
};

Header.defaultProps = { user: null };

export default connect(mapStateToProps, mapDispatchToProps)(Header);
