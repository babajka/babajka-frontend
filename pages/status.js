import React from 'react';

import ErrorMessage from 'components/common/layout/error/ErrorMessage';

const StatusPage = ({ code }) => <ErrorMessage code={code} />;

StatusPage.getLayoutProps = () => ({
  hideFooter: true,
});

export const getServerSideProps = ({ query: { code = 500 } }) => ({ props: { code } });

export default StatusPage;
