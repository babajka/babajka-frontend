import React from 'react';

import ErrorMessage from 'components/common/layout/error/ErrorMessage';

const StatusPage = ({ routerQuery: { code } }) => <ErrorMessage code={code} />;

StatusPage.getLayoutProps = () => ({
  hideFooter: true,
});

export default StatusPage;
