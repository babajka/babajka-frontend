import React, { Component } from 'react';
import withRedux from 'next-redux-wrapper';

import PageLayout from 'components/common/layout/PageLayout';

import initStore from 'redux/store';
import { actions as auth } from 'redux/ducks/auth';
import request from 'utils/request';

class CollectionsPage extends Component {
  static getInitialProps(ctx) {
    return request.populate(ctx, [auth.getCurrentUser]);
  }

  render() {
    const { url } = this.props;
    return (
      <PageLayout url={url} title="header.collections">
        <h1>TODO: Collections Page</h1>
      </PageLayout>
    );
  }
}

export default withRedux(initStore)(CollectionsPage);
