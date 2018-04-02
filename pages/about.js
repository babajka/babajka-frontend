import React from 'react';
import withRedux from 'next-redux-wrapper';

import PageLayout from 'components/common/layout/PageLayout';

import initStore from 'redux/store';

const AboutPage = ({ url }) => (
  <PageLayout url={url}>
    <h1>TODO: About Page</h1>
  </PageLayout>
);

export default withRedux(initStore)(AboutPage);
