import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';

import Redirect from 'components/common/Redirect';

import { authSelectors } from 'redux/ducks/auth';
import { UserShape, PermissionsList } from 'utils/customPropTypes';

import { ROUTES_NAMES } from 'routes';

const mapStateToProps = state => ({
  user: authSelectors.getUser(state),
});

const Guard = ({ permissions, children, user }) => {
  const router = useRouter();
  if (!permissions.length) {
    return children;
  }
  if (!user) {
    return <Redirect to={ROUTES_NAMES.admin.login} params={{ next: router.asPath }} />;
  }
  if (permissions.some(p => !user.permissions[p])) {
    return <Redirect to={ROUTES_NAMES.main} />;
  }
  return children;
};

Guard.propTypes = {
  permissions: PermissionsList.isRequired,
  children: PropTypes.node.isRequired,
  user: UserShape,
};

Guard.defaultProps = {
  user: null,
};

export default connect(mapStateToProps)(Guard);
