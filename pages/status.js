import React from 'react';
import PropTypes from 'prop-types';

import ErrorMessage from 'components/common/layout/error/ErrorMessage';

export const Status = ({ code }) => <ErrorMessage code={code} />;

Status.propTypes = {
  code: PropTypes.oneOf(['404', '500']).isRequired,
};

const StatusPage = ({ routerQuery: { code } }) => <Status code={code} />;

StatusPage.getLayoutProps = () => ({
  hideFooter: true,
});

export default StatusPage;
