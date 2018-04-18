import React, { Component } from 'react';
import withRedux from 'next-redux-wrapper';

import PageLayout from 'components/common/layout/PageLayout';

import initStore from 'redux/store';
import { actions as auth } from 'redux/ducks/auth';
import request from 'utils/request';

class AboutPage extends Component {
  static getInitialProps(ctx) {
    return request.populate(ctx, [auth.getCurrentUser]);
  }

  render() {
    const { url } = this.props;
    return (
      <PageLayout url={url} title="header.about">
        <h1>TODO: About Page</h1>
      </PageLayout>
    );
  }
}

export default withRedux(initStore)(AboutPage);
