import React, { Component } from 'react';
import { withRouter } from 'next/router';
import withRedux from 'next-redux-wrapper';

import PageLayout from 'components/common/layout/PageLayout';

import initStore from 'redux/store';
import { actions as auth } from 'redux/ducks/auth';
import request from 'utils/request';

class PartnersPage extends Component {
  static getInitialProps(ctx) {
    return request.populate(ctx, [auth.getCurrentUser]);
  }

  render() {
    const { router } = this.props;
    return (
      <PageLayout className="page-content" router={router} title="header.partners">
        <h1>TODO: Partners Page</h1>
      </PageLayout>
    );
  }
}

export default withRouter(withRedux(initStore)(PartnersPage));
