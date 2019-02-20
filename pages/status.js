import React from 'react';
import PropTypes from 'prop-types';

import { Error404, Error500 } from 'components/common/layout/error';

export const Status = ({ code }) => (
  <div className="page-content error-page">
    <img className="logo" src="/static/images/logo/turq-transparent.png" alt="wir.by logo" />
    {code === '404' ? <Error404 /> : <Error500 />}
  </div>
);

Status.propTypes = {
  code: PropTypes.oneOf(['404', '500']).isRequired,
};

const StatusPage = ({ routerQuery: { code } }) => <Status code={code} />;

StatusPage.getLayoutProps = () => ({
  hideFooter: true,
});

export default StatusPage;
