import React, { Component } from 'react';
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
    const { url } = this.props;
    return (
      <PageLayout className="page-content" url={url} title="header.partners">
        <h1>TODO: Partners Page</h1>
      </PageLayout>
    );
  }
}

export default withRedux(initStore)(PartnersPage);
