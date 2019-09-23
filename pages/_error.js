import React from 'react';

import ErrorMessage from 'components/common/layout/error/ErrorMessage';

const ErrorPage = ({ statusCode }) => <ErrorMessage code={statusCode} />;

ErrorPage.getInitialProps = ({ res, err }) => {
  const { statusCode = 500 } = res || err || {};
  return { statusCode };
};

ErrorPage.getLayoutProps = () => ({
  hideFooter: true,
});

export default ErrorPage;
