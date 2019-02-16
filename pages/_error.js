import React, { Component } from 'react';

import { Error404, Error500 } from 'components/common/layout/error';

import { actions as auth } from 'redux/ducks/auth';
import request from 'utils/request';

class ErrorPage extends Component {
  static async getInitialProps(ctx) {
    const { res, err } = ctx;
    const { statusCode = null } = res || err;
    await request.populate(ctx, [auth.getCurrentUser]);
    return { statusCode };
  }

  static layoutProps = {
    hideFooter: true,
  };

  render() {
    const { statusCode } = this.props;
    return (
      <div className="page-content error-page">
        <img className="logo" src="/static/images/logo/turq-transparent.png" alt="wir.by logo" />
        {statusCode === 404 ? <Error404 /> : <Error500 />}
      </div>
    );
  }
}

export default ErrorPage;
