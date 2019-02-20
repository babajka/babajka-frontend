import React, { Component } from 'react';

import { Status } from './status';

class ErrorPage extends Component {
  static async getInitialProps(ctx) {
    const { res, err } = ctx;
    const { statusCode = null } = res || err;
    return { statusCode };
  }

  static getLayoutProps = () => ({
    hideFooter: true,
  });

  render() {
    const { statusCode } = this.props;
    return <Status code={`${statusCode}`} />;
  }
}

export default ErrorPage;
