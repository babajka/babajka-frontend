import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';

import Redirect from 'components/common/Redirect';

import { authSelectors } from 'redux/ducks/auth';
import { UserShape, PermissionsList } from 'utils/customPropTypes';

import { ROUTES_NAMES } from 'routes';

const mapStateToProps = state => ({
  user: authSelectors.getUser(state),
});

const Guard = ({ permissions, children, user, router }) => {
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
  router: PropTypes.shape({ asPath: PropTypes.string.isRequired }).isRequired,
};

Guard.defaultProps = {
  user: null,
};

export default connect(mapStateToProps)(withRouter(Guard));
