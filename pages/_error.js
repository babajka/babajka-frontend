import React, { Component } from 'react';
import withRedux from 'next-redux-wrapper';

import PageLayout from 'components/common/layout/PageLayout';
import { Error404, Error500 } from 'components/common/layout/error';

import { actions as auth } from 'redux/ducks/auth';
import initStore from 'redux/store';
import request from 'utils/request';

class ErrorPage extends Component {
  static async getInitialProps(ctx) {
    const { res, err } = ctx;
    const { statusCode = null } = res || err;
    await request.populate(ctx, [auth.getCurrentUser]);
    return { statusCode };
  }

  render() {
    const { statusCode, url } = this.props;
    return (
      <PageLayout className="page-content error-page" url={url} hideFooter>
        <img className="logo" src="/static/images/logo/turq-transparent.png" alt="wir.by logo" />
        {statusCode === 404 ? <Error404 /> : <Error500 />}
      </PageLayout>
    );
  }
}

export default withRedux(initStore)(ErrorPage);
